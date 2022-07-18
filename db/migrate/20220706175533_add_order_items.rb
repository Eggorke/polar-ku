class AddOrderItems < ActiveRecord::Migration[6.0]
  def change
    create_table(:order_items, id: :uuid, default: 'gen_random_uuid()') do |t|
      t.string :state
      t.string :place
      t.string :subject
      t.string :description

      t.belongs_to :order, type: :uuid, null: false, foreign_keys: true

      t.timestamps
    end
  end
end
