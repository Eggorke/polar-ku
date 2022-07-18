class AddOrders < ActiveRecord::Migration[6.0]
  def change
    create_table(:orders, id: :uuid, default: 'gen_random_uuid()') do |t|
      t.string :state
      t.date :due_date
      t.integer :internal_id

      t.belongs_to :organization, type: :uuid, null: false, foreign_keys: true
      t.belongs_to :user,         type: :uuid, null: false, foreign_keys: true

      t.timestamps
    end
  end
end
