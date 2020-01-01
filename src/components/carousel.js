import React, { useState } from "react"
import carouselStyles from "./carousel.module.css"
import { MdChevronRight, MdChevronLeft } from "react-icons/md"

export default ({ urls }) => {
  const [currentPic, setCurrentPic] = useState(0)
  const url = urls[currentPic]

  function nextPic() {
    setCurrentPic((currentPic + 1) % urls.length)
  }

  return (
    <div className={carouselStyles.carousel}>
      <div
        className={carouselStyles.arrowContainer}
        id={carouselStyles.prevArrow}
        onClick={nextPic}
      >
        <MdChevronLeft size="2em" color="gray"/>
      </div>
      <img src={`https:${url}`} />
      <div
        className={carouselStyles.arrowContainer}
        id={carouselStyles.nextArrow}
        onClick={nextPic}
      >
        <MdChevronRight size="2em" color="gray"/>
      </div>
    </div>
  )
}
