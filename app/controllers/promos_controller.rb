class PromosController < ApplicationController

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

end
