import { Text } from "@mantine/core"
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

  console.log("theme.type  =====>",theme.type )

  // const buttonColor = theme.button_color ?? `#F8F4E3`
  const buttonColor = theme.button_color ?? `#9945c3`
  const textColor = theme.text_color ?? `#3E3E3E`
  const Button = Buttons[theme.type ?? "filled"]

  return (
 <>
      <Button
      style={{
        "--button-color": buttonColor,
        "--text-color": textColor,
      }}
      className={theme.type ? ' link-preview default text-center' : `link-preview default text-center rounded-2xl shadow-sm`}
      {...(block.url ? { href: block.url, rel: "noopener noreferrer" } : { component: "button" })}>
      <div className="button-inner ">
        <Text  lineClamp={1}>{block.title || "Untitled"}</Text>
        <span></span>
      </div>
    </Button>
 </>
  )
}

export default Default
