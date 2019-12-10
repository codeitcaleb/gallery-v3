class Photo < ApplicationRecord
  has_one_attached :image

  belongs_to :location

  validates :image, presence: true
  validates :caption, presence: true
  validates :location, presence: true
end
