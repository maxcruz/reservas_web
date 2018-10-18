class FieldsController < ApplicationController

  def find
    field = Field.find_by(id: params[:id])
    render :json => field.to_json(
        only: [:id, :price, :number, :size, :roof]
    )
  end

end
