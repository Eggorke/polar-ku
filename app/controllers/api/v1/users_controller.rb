# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::BaseController

  def self_info
    render_serialized_payload { serialize_resource(current_user) }
  end

  protected

  def serializer
    UserSerializer
  end

end
