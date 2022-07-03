module Serializable
  extend ActiveSupport::Concern

  # Override it at every controller
  def serializer
    'OVERRIDE IT'
  end

  # Call it when you need to serialize one resource
  def serialize_resource(resource)
    serializer.new(resource).serializable_hash
  end

  # Call it when you need to serialize collection of resources
  def serialize_collection(collection)
    pag_collection ||= paginated_collection(collection)
    serializer.new(pag_collection, collection_options(pag_collection)).serializable_hash
  end

  def render_serialized_payload(status = 200)
    render json: yield, status: status, content_type: content_type
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
end
