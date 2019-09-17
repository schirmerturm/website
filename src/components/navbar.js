import React from 'react'
import navbarStyles from './navbar.module.css'
import { Link } from 'gatsby'

export default ({ children }) => {
  return <div>
    <div className={navbarStyles.navContainer}>
      <div className={navbarStyles.left}>
        Schirmerturm
      </div>
      <div className={navbarStyles.right}>
        <Link to='/stufen/pfader'>Pfader</Link>
      </div>
    </div>
    {children}
  </div>
}