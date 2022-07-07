# frozen_string_literal: true

class Organization < ApplicationRecord

  validates :name, :address, :phone, :email, presence: true

  has_many :users
  has_many :orders

  scope :only_public, -> { where(public: true) }
end
