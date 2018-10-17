class CreateFields < ActiveRecord::Migration[5.2]
  def change
    create_table :fields do |t|
      t.integer :number
      t.integer :size
      t.boolean :roof
      t.string :image
      t.integer :price

      t.timestamps
    end
  end
end
