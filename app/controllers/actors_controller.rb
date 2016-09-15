class ActorsController < ApplicationController
	before_filter :set_response_object

	def index
	end

	def create
		name = params[:file].original_filename
		@actor = Actor.new(name: name, avatar: params[:file])
		if @actor.save
			@response[:data] = @actor 
		else
			@response[:error_code] = 500
		end
		render json: @response
	end

	private
	  def user_params
    	params.permit!
  	end
end
