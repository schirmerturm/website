import dropdownStyles from "./dropdown.module.css"
import React, { useState } from "react"

export default ({ title, children, titleClassName }) => {
  const [isCollapsed, setCollapse] = useState(true)

  function toggleCollapse() {
    setCollapse(!isCollapsed)
  }

  return (
    <div className={dropdownStyles.dropdownContainer} onMouseEnter={toggleCollapse} onMouseLeave={toggleCollapse}>
      <a className={`${dropdownStyles.title} ${titleClassName}`}>
        {title}
      </a>
      {isCollapsed || <div className={dropdownStyles.dropdownBox}>
        {children}
      </div>
      }
    </div>
  )
}
