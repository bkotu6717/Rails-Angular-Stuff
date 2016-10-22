class PeopleController < ApplicationController
	before_filter :find_person, except: :index
	def index
		@people = Person.all
		return render json: {people: @people}
	end

	def create
		@person = Person.new(people_params)
		if @person.save
			return render json: {status: true, person: @person}
		else
			return render json: {status: false, errors: @person.errors.full_messages}
		end
	end

	def update
		if @person.update_attributes(people_params)
			return render json: {status: true, person: @person}
		else
			return render json: {status: false, errors: @person.errors.full_messages}
		end	
	end

	def destroy
		if @person.destroy
			return render json: {status: true}
		else
			return render json: {status: false, errors: ["can't delete user!!"]}
		end
	end

	def show
		return render json: {person: @person}
	end

	private
	def people_params
		params.require(:person).permit(:first_name, :last_name, :email, :phone, :id)
	end

	def find_person
		@person = Person.find(params[:id])
	end
end
