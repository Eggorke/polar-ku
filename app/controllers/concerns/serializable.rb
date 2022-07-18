module Serializable
  extend ActiveSupport::Concern

  # Override it at every controller
  def serializer
    'OVERRIDE IT'
  end

  # Call it when you need to serialize one resource
  def serialize_resource(resource)
    serializer.new(resource, resource_options).serializable_hash
  end

  # Call it when you need to serialize collection of resources
  def serialize_collection(collection)
    pag_collection ||= paginated_collection(collection)
    serializer.new(pag_collection, collection_options(pag_collection)).serializable_hash
  end

  def render_serialized_payload(status = 200)
    render json: yield, status: status, content_type: content_type
  end

  def render_error_payload(error, status = 422)
    json = if error.is_a?(ActiveModel::Errors)
             { error: error.full_messages.to_sentence, errors: error.messages }
           elsif error.is_a?(Struct)
             { error: error.to_s, errors: error.to_h }
           else
             { error: error }
           end

    render json: json, status: status, content_type: content_type
  end

  private

  def content_type
    'application/json'
  end

  def paginated_collection(collection)
    Paginate.new(collection, params).call
  end

  def collection_options(collection)
    {
      meta: collection_meta(collection)
    }
  end

  def collection_meta(collection)
    {
      count: collection.size,
      total_count: collection.total_count,
      total_pages: collection.total_pages
    }
  end

  def resource_options
    {}
  end
end
