# frozen_string_literal: true

class Order < ApplicationRecord
  include AASM

  belongs_to :user
  belongs_to :organization

  before_create :set_internal_id

  has_many :order_items, dependent: :destroy

  scope :for_organization, -> (organization_id) { where(organization_id: organization_id) }

  aasm column: :state do
    state :pending, initial: true
    state :in_progress, :completed, :rejected

    event :start do
      transitions from: :pending, to: :in_progress
    end

    event :finish do
      transitions from: :in_progress, to: :completed
    end

    event :reject do
      transitions from: [:pending, :in_progress], to: :rejected
    end
  end

  private

  def set_internal_id
    self.internal_id = Order.for_organization(self.organization_id).count + 1
  end
end
