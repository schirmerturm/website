import React, { PureComponent } from 'react'
import posed, { PoseGroup } from 'react-pose'

const timeout = 0

export default class Transition extends PureComponent {
  render() {
    const { children, location } = this.props

    const RoutesContainer = posed.div({
      enter: {
        opacity: 1,
        y: 0,
        delay: timeout,
        delayChildren: timeout
      },
      exit: {
        opacity: 0,
        y: 30
      }
    })

    return (
      <PoseGroup>
        <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
      </PoseGroup>
    )
  }
}