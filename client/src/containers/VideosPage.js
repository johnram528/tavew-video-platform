import React, { Component } from 'react'
import { Link } from 'react-router'
import '../index.css'

export default class VideosPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      videos: []
    }
    this.fetchVideos.bind(this)
  }

  componentDidMount(){
    this.fetchVideos()
  }

  fetchVideos() {
    fetch('/api/videos')
      .then(response =>response.json())
      .then(data => this.setState({
        videos: data
      })
      )
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child,{
        fetchVideos: this.fetchVideos.bind(this)
      }))

    const videos = this.state.videos.map( (video) =>
        
        <div key={video.id} className="vidContainer">
          <h2>{video.title}</h2>
          <Link to="/videos/2">
            <video width="360" height="240" className="thumbVid">
              <source src={video.url} type={video.type}/>
            </video>
          </Link>
        </div>
  
      )

    return (      
      <div>
      
      
      <Link to="/videos/new">Upload New Video</Link>
      {childrenWithProps || videos}
      

      
      </div>
      )
  }
}