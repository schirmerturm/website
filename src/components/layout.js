import React from 'react';
import Container from './container'
import NavBar from './navbar'

export default ({ children }) => {
  return <NavBar>
    <Container>
      { children }
    </Container>
  </NavBar>
}
