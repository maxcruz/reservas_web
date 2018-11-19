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
          nonce = params[:nonce]
          field = Field.find_by(id: params[:field_id])
          start_date = params[:start]
          end_date = params[:end]
          promo = Promo.where("\"start\" <= ? AND \"end\" >= ?", start_date, end_date)
                       .first
          price = (promo) ? promo.price : field.price
          result = payment(nonce, price)
          if result[:status]
              user = current_user
              if user && field && start_date && end_date
                  code = get_code
                  event = Event.new(
                      start: start_date,
                      end: end_date,
                      code: code,
                      field_id: field.id,
                      user_id: user.id
                  )
                  if event.save
                      render json:{code: code}
                  else
                      render json: {}, status: :internal_server_error
                  end
              else
                  render json: {}, status: :bad_request
              end
          else
              render json:{ messages: result[:messages] }, status: :payment_required
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
