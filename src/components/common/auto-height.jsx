import { useEffect, useRef, useState } from "react"
import AnimateHeight from "react-animate-height"

const AutoHeight = ({ children, ...props }) => {
  const [height, setHeight] = useState("auto")
  const contentDiv = useRef(null)

  useEffect(() => {
    const element = contentDiv.current

    const resizeObserver = new ResizeObserver(() => {
      setHeight(element.clientHeight)
    })

    resizeObserver.observe(element)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <AnimateHeight {...props} height={height} contentRef={contentDiv} disableDisplayNone>
      {children}
    </AnimateHeight>
  )
}

export default AutoHeight
