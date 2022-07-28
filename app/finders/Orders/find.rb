# frozen_string_literal: true

module Orders
  class Find

    # This class will be used for fulture filtrations, searching and sorting
    def initialize(params:, scope:)
      @scope = scope
      @current_user = params[:current_user]
    end

    def execute
      orders = scope
      orders = for_current_organization(orders)
      orders = sorting(orders)
      orders
    end

    private
    attr_reader :scope, :current_user

    def for_current_organization(orders)
      orders.for_organization(current_user.organization_id)
    end

    def sorting(orders)
      orders.order(internal_id: :desc)
    end

  end
end
