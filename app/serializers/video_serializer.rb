class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :file_content_type, :file_file_name, :file_file_size, :created_at, :description, :likes, :gif_url, :img_url
  # belongs_to :user

  def url 
    object.file.url
  end

  def gif_url
    object.file.url.gsub('upload', 'upload/vs_30,dl_300,w_275,h_154').gsub('.mp4', '.gif')
  end

  def img_url
    object.file.url.gsub('.mp4', '.gif')
  end

end


