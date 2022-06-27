class AddOrganizationRefToUsers < ActiveRecord::Migration[6.0]
  def change
    change_table :users do |t|
      t.boolean :confirmed_by_admin, default: false
      t.belongs_to :organization, type: :uuid, null: false, foreign_keys: true
    end
  end
end
