# frozen_string_literal: true

class OrderItemSerializer < BaseSerializer
  set_type :order_item

  attributes :state, :place, :subject, :description

end
