class FieldsController < ApplicationController

  def find
    field = Field.find_by(id: params[:id])
    render :json => field.to_json(
        only: [:id, :price, :number, :size, :roof]
    )
  end
  
  def promos
    promos = Promo.where(field_id: params[:id])
    processed = promos.map { |promo|
        price = ActiveSupport::NumberHelper.number_to_delimited(promo.price)
        {
            title: "PRECIO $#{price}",
            start: promo.start,
            end: promo.end,
            price: promo.price,
            isPromo: true

        }
    }
    render :json => processed.to_json()
  end

  def events
    user = current_user
    events = Event.where(field_id: params[:id])
    processed = events.map { |event| 
        is_mine = user != nil && user.id == event.user_id
        title = is_mine ? event.code : 'RESERVADO'
        {
            title: title,
            start: event.start,
            end: event.end,
            isMine: is_mine
        } 
    }
    render :json => processed.to_json()
  end

end
