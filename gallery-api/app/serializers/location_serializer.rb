class LocationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :city
  has_many :photos
end