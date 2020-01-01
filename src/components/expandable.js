import React, { useState } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import faqStyles from "./expandable.module.css"
import { MdArrowDropDown } from 'react-icons/md'

export default ({ title, body }) => {
  const [isExpanded, setExpanded] = useState(false)

  function toggleExpanded() {
    setExpanded(!isExpanded)
  }

  const answerContainerClasses = `${faqStyles.answerContainer} ${
    isExpanded ? faqStyles.expanded : faqStyles.notExpanded
  }`

  return (
    <div className={faqStyles.container} onClick={toggleExpanded}>
      <div className={faqStyles.questionContainer}>
        <h4>{title}</h4>
        <span><MdArrowDropDown size='1.5em'/></span>
      </div>
      <div className={answerContainerClasses}>
        {documentToReactComponents(body)}
      </div>
    </div>
  )
}
