class UsersController < ApplicationController

	before_filter :find_user, except: :index
	before_filter :set_response_object
	def index
		@users = User.search('bhaskar', load: true)
		@users = User.paginate(:page => params[:page])
		render json: { data: @users, total: User.count }
	end

	def create
		@user = User.new(user_params)
		if @user.save
			@response[:data] = @user
		else
			@response[:data] = @user
			@response[:message] = 'Unprocessible entity.'
		end
		render json: @response
	end

	def update
		if @user
			if @user.update_attributes(user_params)
				@response[:message] = 'Sucessfully updated.'
				@response[:data] = @user
			else
				@response[:message] = 'Update failed.'
				@response[:data] = @user.errors.full_messages
			end
		else
			@user[:message] = 'User does not exist'
		end
		render json: @response
	end

	def destroy
		if @user
			if @user.destroy
				@response[:message] = 'You have successfully deleted the user.'
			else
				@response[:message] = 'Problem deleting the user.'
			end
		else
			@response[:message] = 'User does not exist with the given ID.'
		end
		render json: @response
	end

	def email_uniqueness
		@response[:data] = User.exists?(email: params[:email])
		render json: @response
	end

	private
	def find_user
		@user = User.find_by_id(params[:id])
	end

  def user_params
    params.require(:user).permit(:name, :email, :dob)
  end
end
