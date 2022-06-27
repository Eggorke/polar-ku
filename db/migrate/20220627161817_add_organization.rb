class AddOrganization < ActiveRecord::Migration[6.0]
  def change
    create_table(:organizations, id: :uuid, default: 'gen_random_uuid()') do |t|
      t.string :name
      t.string :address
      t.string :email
      t.string :phone
      t.boolean :public, default: true

      t.timestamps
    end
  end
end
