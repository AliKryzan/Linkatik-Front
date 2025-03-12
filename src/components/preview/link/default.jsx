import { BlocksInArray } from "@/config/bio-blocks"
import { GetPageAppearance } from "@/services/utils"
import { Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { Buttons } from "./buttons"

const Default = ({ block, className, style, onClick }) => {
  const { path } = useParams()
  const { data } = useQuery({
    queryKey: ["bio-page-theme-preview", path],
    queryFn: () => GetPageAppearance(path),
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const theme = data?.appearance?.bio_link

  console.log("theme.type  =====>", theme.type)

  // const buttonColor = theme.button_color ?? `#F8F4E3`
  const buttonColor = theme.button_color ?? `#9945c3`
  const textColor = theme.text_color ?? `#3E3E3E`
  const Button = Buttons[theme.type ?? "filled"]

  // Create a custom click handler that navigates to the URL without exposing it
  const handleClick = (e) => {
    // First call the onClick handler from parent (RenderBlock)
    // This ensures lock verification happens before URL navigation
    if (onClick) {
      onClick(e)
      
      // If the event's default action was prevented by the parent handler
      // (which happens when a block is locked), don't proceed with URL opening
      if (e.defaultPrevented) {
        return
      }
    }

    if (block.url) {
      // If there's a URL, prevent the default action
      e.preventDefault()
      // Open the URL in a new tab without exposing it in the UI
      window.open(block.url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <>
      <Button
        style={style}
        onClick={handleClick}
        className={`${className ?? ""} ${
          theme.type
            ? "link-preview default text-center"
            : `link-preview default rounded-2xl text-center shadow-sm`
        }`}
        {...(block.url ? { component: "button" } : { component: "button" })}>
        <div className="button-inner">
          <Text lineClamp={1}>{block.title || "Untitled"}</Text>
          <span></span>
          {block?.image && <img src={block?.image} className="size-11 rounded-full bg-contain" />}
        </div>
      </Button>
    </>
  )
}

export default Default
