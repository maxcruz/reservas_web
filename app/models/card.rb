class Card 
   include ActiveModel::Model
  attr_accessor :name, :number, :expires, :verify
  validates :name, :number, :expires, :verify, presence: true
end
