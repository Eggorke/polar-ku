# frozen_string_literal: true

class Organization < ApplicationRecord

  validates :name, :address, :phone, :email, presence: true

  has_many :users

  scope :only_public, -> { where(public: true) }
end
