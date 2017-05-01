import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import '../index.css'
import * as actions from '../actions/videos.js'
import { propTypes, defaultProps } from '../props'
import { browserHistory } from 'react-router'


 let timeout = null



 class VideosShow extends Component {
  constructor(props){
    super(props)
    this.state = {
      playing: true,
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };
  componentDidMount(){
    const id = this.props.params.videoId
    this.props.actions.fetchVideo(id)
   }
  componentWillUnmount(){
    clearTimeout(timeout);
    this.context.router.go(this.context.router.getCurrentLocation())
  }

  handleMouseMove() {
    this.resetTimer()
    console.log(this.state)
  }
  startTimer() {
     timeout = setTimeout(() => this.goInactive(), 1500)
    }

  goInactive() {
    this.setState({
      active: false
    })
  }

  goActive() {
    this.setState({
      active: true,
    })
    this.startTimer()
  }
  resetTimer() {
    clearTimeout(timeout);
    this.goActive()
  }
  play() {

    const video = document.querySelector('video')
    if(this.state.playing){
      this.setState({
        playing: false
      })
      video.pause()
    }else{
    this.setState({
      playing: true
    })
    video.play()
    }
  }

  back() {
    browserHistory.push('/videos')
  }

  currentTime() {
    return this.props.video.vid.currentTime
  }

  duration(ev) {
    this.props.video.vid = ev.target
    // this.setState({
    //   currentTime: this.currentTime(),
    // })

    const time = this.props.video.vid.duration
    const minutes = parseInt(time / 60, 10);
    const seconds = parseInt(time % 60,10);
    const duration = minutes+':'+seconds
    this.props.video.duration = duration

  }

  handleTimeChange(ev) {
    let time = ev.target.currentTime
    let timeValue = (time/this.props.video.vid.duration) * 100
    this.setState({timeValue: timeValue})
    const minutes = parseInt(time / 60, 10);
    const seconds = parseInt(time % 60,10); 
    const duration = minutes+':'+seconds
    this.setState({currentTime: duration,})
  }

  render() { 
    let overlay =  (<div className='vid-overlay'>
              <button className='backButton' onClick={() => this.back()}><i className="fa fa-angle-left fa-4x" aria-hidden="true"></i></button>
              <div className='controls'>
                <button className='playButton' onClick={() => this.play()}><i className= {this.state.playing ? 'fa fa-pause fa-2x' : 'fa fa-play fa-2x'} aria-hidden="true"></i></button>
                <progress id='progress-bar' min='0' max='100' value={this.state.timeValue}></progress>  
                {this.state.currentTime} / {this.props.video.duration} 
              </div>
            </div>)
 
    return (      
        <div key={this.props.video.id} className="vidShowContainer" onMouseMove={() => this.handleMouseMove()}>
          <div id='wrap-video' >
            <video className="video" autoPlay onLoadedData={(e) => this.duration(e)} onTimeUpdate={(e) => this.handleTimeChange(e)}>
              <source src={this.props.video.url} type={this.props.video.type}/>
            </video>
            {this.state.active && overlay}
          </div>
       
        </div>
  
    )
  }
}

function mapStateToProps(state) {
  return {
    video: state.videos,
  }
}

function mapDispatchToProps(dispatch) {
    console.log('in dispatch state to props')
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps )(VideosShow)