# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
users = []
100.times do |i|
  users << {name: Faker::Name.name,
    email: Faker::Internet.email,
    dob: Faker::Date.between(20.years.ago, Date.today)
    }
end

User.create(users)

Product.delete_all
products = []
100.times do |i|
	products << {
		name: Faker::Company.name,
		color: Faker::Commerce.color,
		department: Faker::Commerce.department,
		price: Faker::Commerce.price
	}
end

Product.create(products)


Person.delete_all
people = []
100.times do |i|
  people << {first_name: Faker::Name.first_name,
  	last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.phone_number
    }
end

Person.create(people)