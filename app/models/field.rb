class Field < ApplicationRecord
    belongs_to :place
    has_many :promo
    has_many :events
end
