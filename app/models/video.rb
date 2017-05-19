class Video < ApplicationRecord
  #user model is pending
  # belongs_to :user

  has_attached_file :file, :styles => {
    :mp4 => {
      :format => 'mp4',
      :geometry => "1200x700#",
      :convert_options => {
        :input => {},
        :output => {
          :vcodec => 'libx264',
          :movflags => '+faststart',
          :strict => :experimental
        }
      }
    },
    :webm => {
      :format => 'webm',
      :geometry => "1200x700#",
      :convert_options => {
        :input => {},
        :output => {
          :vcodec => 'libvpx',
          :acodec => 'libvorbis',
          'cpu-used' => -10,
          :deadline => :realtime,
          :strict => :experimental
        }
      }
    },



    :preview => {
      :format => :jpg,
      :geometry => "1200x700#",
      :convert_options => {
        :output => {
          :vframes => 1,
          :s => "1200x675",
          :ss => '00:01:02'
        }
      }
    },
    :thumb => {
      :format => :jpg,
      :geometry => "300x169#",
      :convert_options => {
        :output => {
          :vframes => 1,
          :s => '300x169',
          :ss => '00:01:02'
        }
      }
    },
  },
  :processors => [:transcoder]

  validates_attachment_size :file, less_than: 1.gigabytes
  validates_attachment_content_type :file, :content_type => ["video/mp4", "video/quicktime", "video/x-flv", "video/x-msvideo", "video/x-ms-wmv", "video/webm"]
  validates_presence_of :title, :description, :file
  process_in_background :file



end
