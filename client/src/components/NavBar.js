import React from 'react'

import {Navbar, Nav, NavItem} from 'react-bootstrap'
import '../NavBar.css'

export default (props) => {

    return (

<Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">TAVEW</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/">Home</NavItem>
        <NavItem eventKey={2} href="/videos/new">Upload</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}


