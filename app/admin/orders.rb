ActiveAdmin.register Order do
  permit_params :state, :due_date, :organization, :user

  index do
    selectable_column
    id_column
    column :state
    column :due_date
    column :organization
    column :user
    actions
  end

  filter :state
  filter :due_date
  filter :organization
  filter :user

  form do |f|
    f.inputs do
      f.input :due_date
      f.input :organization
      f.input :user
    end
    f.actions
  end
end
