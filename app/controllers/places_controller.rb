class PlacesController < ApplicationController

  def index
    place = Place.joins(:fields).first
    render :json => place.to_json(
        only: [:id, :name, :address, :phone, :email, :parking], 
        :include => {
            :fields => { only: [:image, :number, :size, :roof] }
        }
    )
  end

end
