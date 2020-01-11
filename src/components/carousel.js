import React, { useState, useEffect } from "react"
import carouselStyles from "./carousel.module.css"
import { MdChevronRight, MdChevronLeft } from "react-icons/md"

export default ({ urls }) => {
  const [currentPic, setCurrentPic] = useState(0)
  const url = urls[currentPic]
  const [loading, setLoading] = useState(true)
  const [showCounter, setShowCounter] = useState(true)

  const disableClick = urls.length > 1 ? "" : carouselStyles.singleImage

  // Preload all images
  urls.forEach(url => (new Image().src = url))

  // See Javascript Modulo Bug for negative numbers
  function moduloFix(a, n) {
    return ((a % n) + n) % n
  }

  function nextPic(operation) {
    if (urls.length == 1) {
      return
    }
    setShowCounter(true)
    setTimeout(() => setShowCounter(false), 1000)
    setLoading(true)
    setCurrentPic(moduloFix((operation(currentPic)), urls.length))
  }

  useEffect(() => {
    setTimeout(() => setShowCounter(false), 1000)
  }, [url])

  return (
    <div className={carouselStyles.carousel}>
      <div
        className={`${carouselStyles.arrowContainer} ${disableClick}`}
        id={carouselStyles.prevArrow}
        onClick={() => nextPic((c) => c - 1)}
      >
        <MdChevronLeft size="2em" color="gray" />
      </div>
      <div
        className={
          loading
            ? carouselStyles.loadingMessage
            : `${carouselStyles.loadingMessage} ${carouselStyles.noDisplay}`
        }
      >
        Loading...
      </div>
      <img
        className={loading ? carouselStyles.loading : ""}
        src={`https:${url}`}
        onLoad={() => setLoading(false)}
      />
      <div
        className={`${carouselStyles.counter} ${
          showCounter ? "" : carouselStyles.noOpacity
        }`}
      >
        {currentPic + 1} / {urls.length}
      </div>
      <div
        className={`${carouselStyles.arrowContainer} ${disableClick}`}
        id={carouselStyles.nextArrow}
        onClick={() => nextPic((c) => c + 1)}
      >
        <MdChevronRight size="2em" color="gray" />
      </div>
    </div>
  )
}
