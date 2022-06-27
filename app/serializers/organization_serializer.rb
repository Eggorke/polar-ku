# frozen_string_literal: true

class OrganizationSerializer < BaseSerializer
  set_type :organization

  attributes :email, :address, :name, :phone
end
