class Project < ActiveRecord::Base
  attr_accessible :name
  belongs_to :user
  has_many :uploads

  def path
    "musubi/apps/#{self.user_id}/#{self.id}/"
  end
end
