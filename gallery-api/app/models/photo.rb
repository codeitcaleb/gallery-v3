class Photo < ApplicationRecord
  include Rails.application.routes.url_helpers
  
  has_one_attached :image

  belongs_to :location

  validates :image, presence: true
  validates :caption, presence: true
  validates :location, presence: true

  def photo_image_url
    url_for(self.image)
  end

end