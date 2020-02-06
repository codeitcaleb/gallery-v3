class Api::LocationsController < ApplicationController
  def index
    @locations = Location.all
    
    render json: LocationSerializer.new(@locations)
  end

  def show
    @location = Location.find(params[:id])

     option = {
       include: [:photos]
     }
    render json: LocationSerializer.new(@location, option)
  end
end