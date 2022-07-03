# frozen_string_literal: true

class PublicOrganizationSerializer < BaseSerializer
  set_type :organization

  attributes :name
end
