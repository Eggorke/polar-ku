# frozen_string_literal: true

class UserSerializer < BaseSerializer
  set_type :user

  attributes :email, :first_name, :last_name, :organization_id
end
