# frozen_string_literal: true

ActiveAdmin.register User do
  permit_params :email, :first_name, :last_name, :password, :password_confirmation, :organization, :organization_name, :organization_id

  index do
    selectable_column
    id_column
    column :uid
    column :provider
    column :first_name
    column :last_name
    column :email
    column :confirmed_by_admin
    column :organization
    actions
  end

  filter :first_name
  filter :last_name
  filter :email
  filter :password
  filter :organization

  form do |f|
    f.inputs do
      f.input :email
      f.input :first_name
      f.input :last_name
      f.input :organization
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
end


