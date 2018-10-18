class Field < ApplicationRecord
    belongs_to :place
    has_many :promo
end
