# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session, only: proc { |c| c.request.format.json? }
  include ActionController::MimeResponds

  rescue_from ActiveRecord::RecordInvalid, with: :process_invalid_error
  rescue_from ActiveRecord::RecordNotFound, with: :process_not_found

  rescue_from UncaughtThrowError do |exception|
    original_exception = exception.tag
    case exception.message
    when /Core::Errors::UnauthorizedError/
      process_unauthorized_error(original_exception)
    when /Core::Errors::InvalidArgumentsError/
      process_invalid_error(original_exception)
    else
      throw original_exception
    end
  end

  def process_invalid_error(exception)
    errors = Errors::UnprocessableEntityErrorsSerializer.new(exception: exception).as_json
    render json: errors, status: :unprocessable_entity
  end

  def process_unauthorized_error(exception)
    errors = { errors: [{ status: 401, code: :unauthorized, title: 'Unauthorized', detail: exception.message }] }
    render json: errors, status: :unauthorized
  end

  def process_not_found(exception)
    errors = { errors: [{ status: 404, code: :not_found, title: 'Not Found', detail: exception.message }] }
    render json: errors, status: :not_found
  end
end
