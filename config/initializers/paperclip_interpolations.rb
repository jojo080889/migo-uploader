Paperclip.interpolates('project_id') do |attachment, style|
  attachment.instance.project.id
end

Paperclip.interpolates('user_id') do |attachment, style|
  attachment.instance.project.user.id #parameterize
end
