ActiveAdmin.register OrderItem do
  permit_params :state, :place, :subject,  :description, :order

  index do
    selectable_column
    id_column
    column :state
    column :place
    column :subject
    column :order
    actions
  end

  filter :state
  filter :place
  filter :subject
  filter :description
  filter :order

  form do |f|
    f.inputs do
      f.input :place
      f.input :subject
      f.input :description
      f.input :order
    end
    f.actions
  end
end
