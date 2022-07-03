# frozen_string_literal: true

class Public::OrganizationsController < ApplicationController
  include Serializable

  def index
    render_serialized_payload { serialize_collection(collection) }
  end

  private

  def serializer
    PublicOrganizationSerializer
  end

  def collection
    Organization.only_public
  end
end
