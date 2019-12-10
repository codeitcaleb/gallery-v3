class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.string :image
      t.integer :location_id
      t.text :caption
      
      t.timestamps
    end
  end
end
