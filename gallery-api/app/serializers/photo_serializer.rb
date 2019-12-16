class PhotoSerializer
  include FastJsonapi::ObjectSerializer
  attributes :photo_image_url, :location, :caption
  belongs_to :location
end
