class Api::V1::UsersController < AuthenticatedController
  def self_info
    user = current_user

    render(json: user, serializer: UsersSerializer, status: :ok)
  end

  protected


end
