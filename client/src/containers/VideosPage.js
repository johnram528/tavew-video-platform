import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import '../index.css'
import * as actions from '../actions/videos.js'


 class VideosPage extends Component {

  handleOnLikeClick(event){
    event.preventDefault()
    const id = event.target.parentElement.id
    const likes = event.target.parentElement.dataset.likes
    const vidInfo = {'id': id, 'likes': likes,}
    if(event.target.parentElement.className === "like") {
      this.props.actions.increaseLikes(vidInfo)
    }
    else{
      this.props.actions.decreaseLikes(vidInfo)
    }
  }


  handleOnVidClick(e){
    console.log(e.target)
    browserHistory.push('/videos/' + e.target.dataset.id)
  }


  componentDidMount(){
    this.props.actions.fetchVideos()
  }

  render() {

    const videos = this.props.videos.map( (video) =>

          <div key={video.id} className="thumbVid col-xs-12 col-md-6 col-lg-3">
           
              <div className='vidContainer'>
                <div className='likes'>
                  <a href='#' id={video.id} data-likes={parseInt(video.likes,10)||0} className='like' onClick={(event) => this.handleOnLikeClick(event)}><i className="fa fa-thumbs-o-up fa-lg" aria-hidden="true" ></i></a>
                  {video.likes}
                  <a href='#' id={video.id} data-likes={parseInt(video.likes,10)||0} className='dislike' onClick={(event) => this.handleOnLikeClick(event)}><i className="fa fa-thumbs-o-down fa-lg" aria-hidden="true" ></i></a>
                </div>
                <div className='showPlayCircle'  onClick={(e)=> this.handleOnVidClick(e)}><i className="fa fa-play-circle-o fa-5x" aria-hidden="true" data-id={video.id}></i></div>
                <div className='indexVidTime'><p>{video.duration}</p></div>
                <img 
                  data-id={video.id}
                  className='thumb' 
                  src={video.img_url} alt={video.title} 
                  onMouseOver={(e)=> {e.target.src= video.gif_url}}
                  onMouseOut={(e)=> {e.target.src= video.img_url}}
                  onClick={(e)=> this.handleOnVidClick(e)}/>

              </div>
              <div className='lowerVidContainer row'>
                <p className='vidTitle col-lg-10'><a href={'/videos/' + video.id}>{video.title}</a></p>
                <p className='vidViews col-lg-2'><i className="fa fa-eye" aria-hidden="true"></i> {video.views || 0}</p>
              </div>
           </div> 
      )
               
    const ulStyle = {
      listSyle: 'none'
    }

    return (      
      <div className='wrap'>
        {this.props.children || <div className="videos" style={ulStyle}> {videos} </div> }     
      </div>  
      )
  }
}

function mapStateToProps(state) { 
  return {videos: state.videos.sort(function(a,b){return b.likes - a.likes}) }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage)