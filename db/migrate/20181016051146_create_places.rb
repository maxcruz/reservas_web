class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :email
      t.boolean :parking

      t.timestamps
    end
  end
end
