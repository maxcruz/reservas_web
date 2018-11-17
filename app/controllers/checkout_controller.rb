class CheckoutController < ApplicationController

  def new_token
  end

  def checkout
      card = Card.new(
          name: params[:name],
          number: params[:number],
          expires: params[:expires],
          verify: params[:verify]
      )
      field = Field.find_by(id: params[:field_id])
      # TODO: Use promotions price
      price = field.price
      if payment(card, price)
          user = current_user
          start_date = params[:start]
          end_date = params[:end]
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
          render json:{}, status: :payment_required
      end
  end

  def payment(card, price)
      if (card.valid?)
          # TODO: Call payu API here (we need https)
          return true
      end
      return false
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