class CreatePromos < ActiveRecord::Migration[5.2]
  def change
    create_table :promos do |t|
      t.datetime :start
      t.datetime :end
      t.integer :price
      t.belongs_to :field, foreign_key: true

      t.timestamps
    end
  end
end
