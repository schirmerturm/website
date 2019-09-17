import React from 'react';
import Container from './container'

export default ({ children }) => {
  return <NavBar>
    <Container>
      { children }
    </Container>
  </NavBar>
}