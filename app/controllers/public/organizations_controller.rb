# frozen_string_literal: true

class Public::OrganizationsController < ApplicationController
  # TO DO add paginations
  def index
    render json: serializer.new(scope).serializable_hash, status: :ok
  end

  private

  def serializer
    OrganizationSerializer
  end

  def scope
    Organization.where(public: true)
  end
end
