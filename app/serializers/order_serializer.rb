# frozen_string_literal: true

class OrderSerializer < BaseSerializer
  set_type :order

  attributes :state, :due_date, :user_id, :organization_id, :internal_id

  attribute :created_at do |obj|
    obj.created_at.strftime("%Y-%m-%d")
  end

  attribute :user_info do |obj|
    obj.user.full_name
  end

  has_many :order_items
end
