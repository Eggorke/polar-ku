# frozen_string_literal: true

class Api::V1::BaseController < AuthenticatedController
  protected

  def content_type
    'application/json'
  end

  def serializer
    'OVERRIDE IT'
  end

  def serialize_resource(resource)
    serializer.new(resource).serializable_hash
  end

  def render_serialized_payload(status = 200)
    render json: yield, status: status, content_type: content_type
  end

end
