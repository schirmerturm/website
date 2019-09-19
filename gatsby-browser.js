import "./src/styles/global.css"
// import React from 'react'
// import Transition from './src/components/transition'

// export const wrapPageElement = ({ element, props}) => {
//   return <Transition {...props}>{element}</Transition>
// }

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
