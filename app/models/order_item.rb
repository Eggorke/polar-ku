# frozen_string_literal: true

class OrderItem < ApplicationRecord
  include AASM

  validates :place, :subject, :description, presence: true

  belongs_to :order

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
