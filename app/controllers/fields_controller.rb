class FieldsController < ApplicationController

  def find
    field = Field.find_by(id: params[:id])
    render :json => field.to_json(
        only: [:id, :price, :number, :size, :roof]
    )
  end
  
  def promos
    promos = Promo.where(field_id: params[:id])
    render :json => promos.to_json(
        only: [:start, :end, :price]
    ) 
  end

  def events
    events = Event.where(field_id: params[:id])
    render :json => events.to_json(
        only: [:start, :end]
    ) 
  end

end
