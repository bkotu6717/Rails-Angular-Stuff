class User < ActiveRecord::Base
	include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
	# validates_format_of :name, with: /\A[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+\z/
	validates :email, format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, uniqueness: true
	validates_format_of :dob, with: /\d{4}-\d{2}-\d{2}/
	self.per_page = 10
end
