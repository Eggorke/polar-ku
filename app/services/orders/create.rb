# frozen_string_literal: true

module Orders
  class Create < BaseService
    attr_accessor :due_date, :order_items

    validates :due_date, :order_items, presence: true
    validate :validate_items

    def call
      Order.transaction do
        @order = current_user.orders.create(due_date: due_date, organization: current_user.organization)
        @order.order_items.create(order_items)
      end
      @order
    end

    private

    def validate_items
      order_items.each do |oi|
        errors.add(:order_items, "Place can't be blank") unless oi[:place].present?
        errors.add(:order_items, "Subject can't be blank") unless oi[:subject].present?
        errors.add(:order_items, "Description can't be blank") unless oi[:description].present?
      end
    end
  end
end
