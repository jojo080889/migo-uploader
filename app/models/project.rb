class Project < ActiveRecord::Base
  attr_accessible :name
  belongs_to :user
  has_many :uploads

  def path
    "apps/#{self.user_id}/musubi/apps/#{self.id}/"
  end
end
