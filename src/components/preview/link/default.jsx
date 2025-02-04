import { Box, Image, Text,Button } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { BlocksInArray } from "../../../config/bio-blocks"
import { GetPageAppearance } from "../../../services/utils"
import { Buttons } from "./buttons"

const Default = ({ block }) => {
  const { path } = useParams()
  const { data } = useQuery({
    queryKey: ["bio-page-theme-preview", path],
    queryFn: () => GetPageAppearance(path),
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const theme = data?.appearance?.bio_link

  const Button = Buttons[theme.type ?? "filled"]
  const buttonColor = theme.button_color ?? `#fcf3d8`
  const textColor = theme.text_color ?? `#000000`



  console.log("theme.button_color =======>",data)

  return (
    <Button
      style={{
        "--button-color": buttonColor,
        "--text-color": textColor,
      }}
      className="link-preview default"
      {...(block.url ? { href: block.url, rel: "noopener noreferrer" } : { component: "button" })}>
      <div >
        {block.title || "Untitled"}
        <span></span>
      </div>
    </Button>
  )
}

export default Default
