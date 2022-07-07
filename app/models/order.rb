# frozen_string_literal: true

class Order < ApplicationRecord
  include AASM

  belongs_to :user
  belongs_to :organization

  has_many :order_items, dependent: :destroy

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
end
