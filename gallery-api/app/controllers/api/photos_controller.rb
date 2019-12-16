class Api::PhotosController < ApplicationController
  before_action :set_photo, only: [:show, :update, :destroy]

  # GET /photos
  def index
    @photos = Photo.all
    render json: PhotoSerializer.new(@photos)
  end
  # GET /photos/1
  def show
    render json: @photo
  end

  # POST /photos
  def create
    @photo = Photo.new
    @location = Location.find_or_create_by(city: params[:location])
    @photo.image.attach(params[:image])
    @photo.location = @location
    @photo.caption = params[:caption]
    
    # byebug
    
    if @photo.save
      render json:  PhotoSerializer.new(@photo)
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /photos/1
  # def update
  #   if @photo.update(photo_params)
  #     render json: @photo
  #   else
  #     render json: @photo.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /photos/1
  def destroy
    @photo.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end

    # def set_location
    #   @location = Location.find_or_create_by(city: params[:photo][:location][:city])
    # end

    # Only allow a trusted parameter "white list" through.
    # def photo_params
    #   params.fetch(:photo, {}).permit(:image, :caption)
    # #   # params.require(:photo).permit(:image, :location, :caption)
    # end
end