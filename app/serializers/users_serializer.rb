# frozen_string_literal: true

class UsersSerializer < ActiveModel::Serializer
  type :users
  attributes :id, :email, :first_name, :last_name
end
