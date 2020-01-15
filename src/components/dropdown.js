import dropdownStyles from "./dropdown.module.css"
import React, { useState } from "react"

export default ({ title, children, titleClassName, disabled }) => {
  const [isCollapsed, setCollapse] = useState(true)

  function toggleCollapse() {
    setCollapse(!isCollapsed)
  }

  if (disabled) {
    return <div className={dropdownStyles.disabled}>{children}</div>
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
