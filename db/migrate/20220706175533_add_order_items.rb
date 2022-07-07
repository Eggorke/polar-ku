class AddOrderItems < ActiveRecord::Migration[6.0]
  def change
    create_table(:order_items) do |t|
      t.string :state
      t.string :place
      t.string :subject
      t.string :description

      t.belongs_to :order, null: false, foreign_keys: true

      t.timestamps
    end
  end
end
