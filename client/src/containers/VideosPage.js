import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import '../index.css'
import * as actions from '../actions/videos.js'


 class VideosPage extends Component {

  handleOnLikeClick(event){
    event.preventDefault()
    const id = event.target.parentElement.id
    const likes = event.target.parentElement.dataset.likes
    const vidInfo = {'id': id, 'likes': likes}
    if(event.target.parentElement.className === "like") {
      this.props.actions.increaseLikes(vidInfo)
    }
    else{
      this.props.actions.decreaseLikes(vidInfo)
    }
  }


  componentDidMount(){
    this.props.actions.fetchVideos()
  }

  render() {
    const videos = this.props.videos.map( (video) =>
        <li key={video.id}>
          <div className="thumbVid">
            <Link onClick={this.forceUpdate} to={"/videos/" + video.id}>
              <div className='vidContainer'>
                <div className='likes'>
                  <a href='#' id={video.id} data-likes={parseInt(video.likes,10)||0} className='like' onClick={(event) => this.handleOnLikeClick(event)}><i className="fa fa-thumbs-o-up fa-lg" aria-hidden="true" ></i></a>
                  {video.likes}
                  <a href='#' id={video.id} data-likes={parseInt(video.likes,10)||0} className='dislike' onClick={(event) => this.handleOnLikeClick(event)}><i className="fa fa-thumbs-o-down fa-lg" aria-hidden="true" ></i></a>
                </div>
                                <video width="275" height="154" className='thumb'>
                  <source src={video.url} type={video.type}/>
                </video>
              </div>
            </Link>
            <p className='vidTitle'>{video.title}</p>
            <br/>
           </div> 
         </li> 
      )
               
    const ulStyle = {
      listSyle: 'none'
    }

    return (      
      <div className='wrap'>
        {this.props.children || <ul className="videos" style={ulStyle}> {videos} </ul> }     
      </div>  
      )
  }
}

function mapStateToProps(state) { 
  return {videos: state.videos }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage)