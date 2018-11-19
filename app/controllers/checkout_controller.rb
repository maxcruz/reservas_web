class CheckoutController < ApplicationController

    before_action :authorize

    def new_token
        client_token = gateway.client_token.generate
        if (client_token)
            render json:{token: client_token}
        else
            render json: {}, status: :internal_server_error
        end
    end

    def checkout
        start_date = params[:start]
        end_date = params[:end]
        # Validate repeated event
        event = Event.where("\"start\" <= ? AND \"end\" >= ?", start_date, end_date).first
        if (event)
            render json: {}, status: :bad_request
            return
        end
        user = current_user
        field = Field.find_by(id: params[:field_id])
        if user && field && start_date && end_date
            # If is admin, just save the
            if (user.is_admin)
                save_event(start_date, end_date, "BLOQUEADO", field.id, user.id)
                return
            end
            # Payment
            promo = Promo.where("\"start\" <= ? AND \"end\" >= ?", start_date, end_date).first
            price = (promo) ? promo.price : field.price
            nonce = params[:nonce]
            result = payment(nonce, price)
            # Evaluate results and save event
            if result[:status]
                code = get_code
                save_event(start_date, end_date, code, field.id, user.id)
            else
                render json:{ messages: result[:messages] }, status: :payment_required
            end
        else
            render json: {}, status: :bad_request
        end
    end

    def save_event(start_date, end_date, code, field_id, user_id)
        event = Event.new(
            start: start_date,
            end: end_date,
            code: code,
            field_id: field_id,
            user_id: user_id
        )
        if event.save
            render json:{code: code}
        else
            render json: {}, status: :internal_server_error
        end
    end

    def payment(nonce, amount)
        result = gateway.transaction.sale(
            amount: amount,
            payment_method_nonce: nonce,
            :billing => {
                :country_code_alpha2 => 'CO'
            },
            :options => {
                :submit_for_settlement => true
            }
        )
        if result.success? || result.transaction
            return { :status => true}
        else
            error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
            return { :status => false, :messages => error_messages }
        end
    end

    def get_code()
        return SecureRandom.hex(6).upcase
    end

    def gateway
        env = ENV["BT_ENVIRONMENT"]
        @gateway ||= Braintree::Gateway.new(
            :environment => env && env.to_sym,
            :merchant_id => ENV["BT_MERCHANT_ID"],
            :public_key => ENV["BT_PUBLIC_KEY"],
            :private_key => ENV["BT_PRIVATE_KEY"],
        )
    end

end
