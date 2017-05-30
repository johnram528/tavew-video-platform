class Api::VideosController < ApplicationController
  def index
    videos = Video.all
    render json: videos
  end

  def show
    video = Video.find_by(id: params[:id])
    render json: video
  end

  def create 
    video = Video.new(video_params)
    if video.save
      render json: { success: 'ok'}
    else 
      render json: { message: 'error'}, status: 412
    end
  end

  def update
    video = Video.find_by(id: params[:id])
    video.likes = params[:video][:likes] || video.likes
    video.views = params[:video][:views] || video.views
    if video.save
      render json: { success: 'ok'}
    else 
      render json: { message: 'error'}, status: 412
    end
  end

  private 
    def video_params
      params.require(:video).permit(:file, :title, :description, :user_id, :likes, :views)
    end
end
