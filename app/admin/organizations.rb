ActiveAdmin.register Organization do
  permit_params :name, :address, :email, :phone, :public

  index do
    selectable_column
    id_column
    column :email
    column :name
    column :address
    column :phone
    column :public
    actions
  end

  filter :email
  filter :name
  filter :address
  filter :phone
  filter :public

  form do |f|
    f.inputs do
      f.input :email
      f.input :name
      f.input :address
      f.input :phone
      f.input :public
    end
    f.actions
  end
end
