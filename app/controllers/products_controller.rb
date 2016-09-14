class ProductsController < ApplicationController
	before_filter :set_response_object
	def index
  	params[:page] ||= 1
		@products = Product.paginate(:page => params[:page])
		@response[:data] = @products
		render json: @response
 		
  end
end
