# frozen_string_literal: true

class BaseService
  include ActiveModel::Model

  attr_accessor :current_user

  validates :current_user, presence: true

  def initialize(attributes = {}, current_user)
    assign_attributes(attributes) if attributes
    @current_user = current_user
  end
end
