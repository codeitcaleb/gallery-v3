class Location < ApplicationRecord
  has_many :photos

  validates :city, presence: true
end
