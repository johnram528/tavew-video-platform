import React, { Component } from 'react';
import NavBar from './NavBar'
import '../App.css';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavBar/>
        {this.props.children}
      </div>

      )
  }
}

