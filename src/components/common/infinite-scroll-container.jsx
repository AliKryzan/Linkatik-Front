import { useInView } from "react-intersection-observer"

const InfiniteScrollContainer = ({ children, className, onBottomReached }) => {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView) onBottomReached()
    },
  })
  return (
    <div className={className}>
      {children}
      <div ref={ref} className="h-10"></div>
    </div>
  )
}

export default InfiniteScrollContainer
