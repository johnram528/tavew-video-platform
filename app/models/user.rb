#User model is pending

class User < ApplicationRecord
  has_many :videos 

  validates_presence_of :username, :email  
  validates_uniqueness_of :username, :email
  has_secure_password
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end


