# frozen_string_literal: true

class Users::SessionsController < DeviseTokenAuth::SessionsController
  def render_create_success
    if current_user.nil?
      head :unauthorized
    else
      render(
        json:       current_user,
        serializer: UserSerializer,
        status:     :ok
      )
    end
  end
end
