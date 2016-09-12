class User < ActiveRecord::Base
	validates_format_of :name, with: /[\w]+([\s]+[\w]+){1}+/
	validates :email, format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, uniqueness: true
	validates_format_of :dob, with: /\d{4}-\d{2}-\d{2}/
end
