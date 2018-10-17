class PlacesController < ApplicationController

  def index
    place = Place.first
    render :json => place
  end

end
