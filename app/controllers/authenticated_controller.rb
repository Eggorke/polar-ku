# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Serializable

  before_action :authenticate_user!

  def params_with_current_user
    params.merge!(current_user: current_user)
  end

end
