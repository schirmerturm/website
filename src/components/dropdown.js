import dropdownStyles from "./dropdown.module.css"
import React, { useState } from "react"

export default ({ title, children }) => {
  const [isCollapsed, setCollapse] = useState(true)

  function toggleCollapse() {
    setCollapse(!isCollapsed)
  }

  return (
    <div className={dropdownStyles.dropdownContainer}>
      <a className={dropdownStyles.title} onClick={toggleCollapse}>
        {title}
      </a>
      {isCollapsed || <div className={dropdownStyles.dropdownBox}>
        {children}
      </div>
      }
    </div>
  )
}
