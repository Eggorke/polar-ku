# frozen_string_literal: true

class Api::V1::OrdersController < AuthenticatedController

  # In future - move it to resource_controller and it will allow to reuse it for all controllers
  def index
    render_serialized_payload { serialize_collection(collection) }
  end

  def create
    model_module::Create.new(permitted_params, current_user).tap do |service|
      if service.valid?
        order = service.call
        render_serialized_payload { serialize_resource(order) }
      else
        render_error_payload(service.errors)
      end
    end
  end

  protected

  def serializer
    OrderSerializer
  end

  def collection
    model_module::Find.new(params: params_with_current_user, scope: scope).execute
  end

  def model_module
    Orders
  end

  def scope
    Order.all.includes(:order_items)
  end

  def permitted_params
    params.permit(:due_date, order_items: [:place, :subject, :description])
  end

  def collection_options(collection)
    super.merge(order_includes)
  end

  def resource_options
    order_includes
  end

  def order_includes
    {
      include: [:order_items]
    }
  end
end
