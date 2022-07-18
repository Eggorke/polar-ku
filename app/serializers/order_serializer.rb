# frozen_string_literal: true

class OrderSerializer < BaseSerializer
  set_type :order

  attributes :state, :due_date, :user_id, :organization_id, :internal_id, :created_at

  has_many :order_items
end
