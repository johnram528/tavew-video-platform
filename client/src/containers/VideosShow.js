import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import '../index.css'
import * as actions from '../actions/videos.js'
import { browserHistory } from 'react-router'
import {VideoSeekSlider} from 'react-video-seek-slider';
import 'react-video-seek-slider/lib/video-seek-slider.css'

 let timeout = null


 class VideosShow extends Component {
  constructor(props){
    super(props)
    this.state = {
      playing: true,
      active: false, 
      seekValue: 0,

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
  playPause() {

    if(this.state.playing){
      this.pause()
    }else{
    this.play()
    }
  }

  back() {
    browserHistory.push('/videos')
  }

  currentTime() {
    return this.props.video.vid.currentTime
  }

  duration(ev) {
    console.log('video loaded')
    this.props.video.vid = ev.target
    this.setState({video: document.querySelector('video'), duration: this.props.video.vid.duration})
    const time = this.props.video.vid.duration
    const minutes = parseInt(time / 60, 10);
    const seconds = parseInt(time % 60,10);
    const duration = minutes+':'+seconds
    this.props.video.duration = duration

  }

  handleTimeChange(ev) {
    let time = ev.target.currentTime
    let timeValue = (time/this.props.video.vid.duration) * 100
    this.setState({timeValue: timeValue, seekValue:timeValue, currentTime:time})
    const minutes = parseInt(time / 60, 10);
    const seconds = parseInt(time % 60,10); 
    const duration = seconds >= 10 ? minutes+':'+seconds : minutes+':'+'0'+seconds
    this.setState({currentDisplayTime: duration,})
  }
  pause(){
    this.setState({
        playing: false
      })
    this.state.video.pause()
  }
  play() {
    this.setState({
      playing: true
    })
    this.state.video.play()
  }
  handleSeek(time) {
    this.setState({currentTime:time}) 
    this.state.video.currentTime = this.state.currentTime
  }

  render() { 

    let pausedDisplay = <div className='pausedDisplay'>{this.props.video.description}</div>

    let overlay =  (<div className='vid-overlay'>
              <button className='backButton' onClick={() => this.back()}><i className="fa fa-angle-left fa-4x" aria-hidden="true"></i></button>
              {!this.state.playing && pausedDisplay}
              <div className='controls'>
                <VideoSeekSlider max={this.state.duration} currentTime={this.state.currentTime} progress={0} onChange={(time:number)=> this.handleSeek(time)} />
                <div className='lowerControls'>
                  <p className='controlVidTitle'><span className='playing'>Playing: </span>{this.props.video.title}</p>
                  <button className='playButton' onClick={() => this.playPause()}><i className={this.state.playing ? 'fa fa-pause fa-2x' : 'fa fa-play fa-2x'} aria-hidden="true"></i></button>
                  <button className='volume'><i className="fa fa-volume-up fa-lg" aria-hidden="true"></i></button>
                  <button className='volumeMute'><i className="fa fa-volume-off fa-lg" aria-hidden="true"></i></button>
                  <button className='fullScreen'><i className="fa fa-expand fa-lg" aria-hidden="true"></i></button>    
                  <p className='displayTime'>{this.state.currentDisplayTime} / {this.props.video.duration}</p> 
                </div>
              </div>
            </div>)
    
    return (      
        <div key={this.props.video.id} className="vidShowContainer" onMouseMove={() => this.handleMouseMove()}>
          <div id='wrap-video' >
            <video className="video" autoPlay onLoadedData={(e) => this.duration(e)} onTimeUpdate={(e) => this.handleTimeChange(e)}>
              <source src={this.props.video.url} type={this.props.video.type}/>
            </video>
            {overlay}
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