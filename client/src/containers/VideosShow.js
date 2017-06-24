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
      volume: 100,
      fullScreen: false,

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
    console.log(this.state)
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
    const vidInfo = {id: this.props.video.id, views: this.props.video.views,}
    this.props.actions.increaseViews(vidInfo)
    this.props.video.vid = ev.target
    this.setState({video: document.querySelector('video'), duration: this.props.video.vid.duration})
    const time = this.props.video.vid.duration
    const minutes = parseInt(time / 60, 10);
    const seconds = parseInt(time % 60,10);
    const duration = seconds >= 10 ? minutes+':'+seconds : minutes+':0'+seconds
    this.props.video.duration = duration

  }

  handleTimeChange(ev) {
    let time = ev.target.currentTime
    let timeValue = (time/this.props.video.vid.duration) * 100
    this.setState({timeValue: timeValue, seekValue:timeValue, currentTime:time})
    const minutes = parseInt(time / 60, 10);
    const seconds = parseInt(time % 60,10); 
    const duration = seconds >= 10 ? minutes+':'+seconds : minutes+':0'+seconds
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
    this.props.video.vid.currentTime = this.state.currentTime
  }

  handleVolumeChange(e){
    this.setState({
      volume:parseInt(e.target.value,10)
    })
    this.props.video.vid.volume = this.state.volume/100;
  }

  handleVolMute() {
    this.setState({
      volume: 0
    })
    this.props.video.vid.volume = 0
  }

   handleVolFull() {
    this.setState({
      volume: 100
    })
    this.props.video.vid.volume = 1
  }

  handleFullScreen(){
    !this.state.fullScreen ? this.props.video.vid.webkitEnterFullscreen() : this.props.video.vid.webkitExitFullscreen()
  }

  handleTenBack(e){
    let time = e.target.currentTime - 10
    this.setState({
      currentTime: time,
    })
    this.props.video.vid.currentTime = this.state.currentTime
  }
  render() { 
    if(this.state.volume === 0){
      this.props.video.vid.volume = 0
    }

    let socialButtons = (<div className='socialButtons'>
                          <div className = 'fbLikeBtn'>
                            FB
                          </div>
                          <div className='tweetBtn'>
                            Tweet
                          </div>
                          <div className='embedBtn'>
                            Embed
                          </div>

                          
                        </div>)

        let pausedDisplay = (<div className='pausedDisplay'>
                          <div className='pausedContainer'>
                          {socialButtons}
                            <p className='watching'> You're Watching</p><br/>
                            <p className='pausedDisplayTitle'>{this.props.video.title}</p><br/>
                            <p className='pausedDisplayDesc'>{this.props.video.description}</p>
                          </div>
                        </div>) 

    let overlay =  (<div className='vid-overlay'>
              <button className='backButton' onClick={() => this.back()}><i className="fa fa-angle-left fa-4x" aria-hidden="true"></i></button>
              {!this.state.playing && pausedDisplay}
              <div className='controls'>
                <VideoSeekSlider max={this.state.duration} currentTime={this.state.currentTime} progress={0} onChange={(time:number)=> this.handleSeek(time)} />
                <div className='lowerControls row'>
                  <button className='playButton col-sm-1' onClick={() => this.playPause()}><i className={this.state.playing ? 'fa fa-pause fa-2x' : 'fa fa-play fa-2x'} aria-hidden="true"></i></button>
                  <div className='vol col-sm-2'>
                    <button className='volumeMute' onClick={()=> this.handleVolMute()}><i className="fa fa-volume-off fa-lg" aria-hidden="true"></i></button>
                    <input className='volumeRange' type='range' value={this.state.volume} onChange={(e)=> this.handleVolumeChange(e)}/>
                    <button className='volume' onClick={()=> this.handleVolFull()}><i className="fa fa-volume-up fa-lg" aria-hidden="true"></i></button>
                  </div>
                  <div className='tenBack'> 
                    <button className='tenBackBtn' onClick={(e)=> this.handleTenBack(e)}>
                    Ten
                    </button>
                  </div>
                  <p className='controlVidTitle col-sm-4'><span className='playing'>Playing: </span>{this.props.video.title}</p>    
                  <p className='displayTime col-sm-2'>{this.state.currentDisplayTime} / {this.props.video.duration}</p>
                  <button className='fullScreen col-sm-1' onClick={()=> this.handleFullScreen()}><i className="fa fa-expand fa-lg" aria-hidden="true"></i></button> 
                </div>
              </div>
            </div>)
    
    return (      
        <div key={this.props.video.id} className="vidShowContainer" onMouseMove={() => this.handleMouseMove()}>
          <div id='wrap-video' >
            <video className="video" autoPlay onLoadedData={(e) => this.duration(e)} onTimeUpdate={(e) => this.handleTimeChange(e)}>
              <source src={this.props.video.url} type={this.props.video.type}/>
            </video>
             {this.state.active || !this.state.playing ? overlay : null}  
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
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps )(VideosShow)