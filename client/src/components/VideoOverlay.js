port React, { Component } from 'react';

import '../App.css';

export default class VideoOverlay extends Component {

  render() {
    return (<div className='vid-overlay'>
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
}

