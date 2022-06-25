class Api::V1::UsersController < AuthenticatedController
  def self_info
    render(json: current_user, serializer: UsersSerializer, status: :ok)
  end

  protected

end
