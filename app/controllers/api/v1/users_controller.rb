# frozen_string_literal: true

class Api::V1::UsersController < AuthenticatedController

  def self_info
    render_serialized_payload { serialize_resource(resource) }
  end

  protected

  def serializer
    UserSerializer
  end

  def resource
    current_user
  end
end
