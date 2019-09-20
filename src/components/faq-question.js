import React, { useState } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import faqStyles from "./faq-question.module.css"

export default ({ question, answer }) => {
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
        <h4>{question}</h4>
      </div>
      <div className={answerContainerClasses}>
        {documentToReactComponents(answer)}
      </div>
    </div>
  )
}
