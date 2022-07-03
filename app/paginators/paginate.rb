
class Paginate

  PER_PAGE_LIMIT = 50.freeze

  def initialize(collection, params)
    @collection = collection
    @page       = params[:page] || 1
    @per_page   = params[:per_page].to_i.between?(1, PER_PAGE_LIMIT) ? params[:per_page] : 500
  end

  def call
    collection.page(page).per(per_page)
  end

  private

  attr_reader :collection, :page, :per_page
end
