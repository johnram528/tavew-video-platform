import React, { Component } from 'react';
import NavBar from './NavBar'
import '../App.css';

export default class App extends Component {

  render() {
    if(this.props.router.routes[1].path === "/videos/:videoId") {
    return (
      <div className='App'>
        {this.props.children}
      </div>

      )
  }else {
    return (
      <div className='App'>
        <NavBar/>
        {this.props.children}
      </div>

      )
  }
  }
}

