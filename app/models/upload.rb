class Upload < ActiveRecord::Base
  attr_accessible :upload, :project_id
  belongs_to :project
  has_attached_file :upload, 
    :path => ":rails_root/public/apps/:user_id/musubi/apps/:project_id/:filename",
    :url => "/apps/:user_id/musubi/apps/:project_id/:filename"

  include Rails.application.routes.url_helpers

  def to_jq_upload
    {
      "name" => read_attribute(:upload_file_name),
      "size" => read_attribute(:upload_file_size),
      "project" => self.project_id,
      "url" => upload.url(:original),
      "delete_url" => upload_path(self),
      "delete_type" => "DELETE" 
    }
  end

end
