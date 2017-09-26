import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/videos.js'


class VideosNew extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
    }
  }

  componetWillUnmount() {
    this.setState({
      loading:false,
    })
  }

  handleInputChange(event) {
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleOnAttach(event) { 
    const input = document.querySelector('input[type="file"]')
    this.setState({
      file: input.files[0],
    })
  }

  handleOnClick(event) {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const data = new FormData()
    data.append('video[title]', this.state.title)
    data.append('video[description]', this.state.description)
    data.append('video[file]', this.state.file)
    data.append('video[user_id]', 1)

    this.props.actions.addVideo(data).then(() => {
      this.props.router.push('/videos')
    })


  }
  

  render() {
    console.log(this.state)
    const loading = (        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>)
    return (
      <div>
        <div className='form'>
        <form id="form" onSubmit={(event) => this.handleOnClick(event)}>
          <div className='inputWrap row justify-content-center'>
            <div className='formTitle col-xs-12'>Upload Video</div>
            <div className='input-group col-xs-12'>
              <input className='add-video-field'
              type="text" 
              name="title"
              placeholder='Title'  
              onChange={(event) => this.handleInputChange(event)}/>
            </div>

            <div className='input-group'>
              <input className='add-video-field'
              type="text" 
              name="description"
              placeholder='Description' 
              size='70'
              onChange={(event) => this.handleInputChange(event)}/>
            </div>
                    
            <div className='input-group col-xs-12'>
              <input className='add-video-field'
              type="file" 
              name="file" 
              accept="video/mp4,video/x-m4v,video/*"
              onChange={(event) => this.handleOnAttach(event)}/>
            </div>

            <div className='input-group col-xs-12'>
              <input className='add-video-button'
              type="submit" 
              name="Upload Video" 
              />
            </div>
          </div>
        </form>
        </div>
          {this.state.loading && loading}
        </div>
      )
  }
}

  
function mapDispatchToProps(dispatch) {
    console.log('in dispatch state to props')
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(null, mapDispatchToProps )(VideosNew)
   