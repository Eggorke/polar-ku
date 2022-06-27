# frozen_string_literal: true

class Public::OrganizationsController < ApplicationController
  # TO DO add paginations
  def index
    render json: OrganizationSerializer.new(Organization.all).serializable_hash, status: :ok
  end
end
