import { Box, Image, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { BlocksInArray } from "../../../config/bio-blocks"
import { GetPageAppearance } from "../../../services/utils"
import {
  CustomButtonOne,
  CustomButtonThree,
  CustomButtonTwo,
  Filled,
  FilledRoundedLg,
  FilledRoundedSm,
  HardShadow,
  HardShadowRoundedLg,
  HardShadowRoundedSm,
  Outline,
  OutlineRoundedLg,
  OutlineRoundedSm,
  Shadow,
  ShadowRoundedLg,
  ShadowRoundedSm,
} from "./buttons"

const Buttons = {
  filled: Filled,
  "filled-rounded-sm": FilledRoundedSm,
  "filled-rounded-lg": FilledRoundedLg,
  outline: Outline,
  "outline-rounded-sm": OutlineRoundedSm,
  "outline-rounded-lg": OutlineRoundedLg,
  shadow: Shadow,
  "shadow-rounded-sm": ShadowRoundedSm,
  "shadow-rounded-lg": ShadowRoundedLg,
  "hard-shadow": HardShadow,
  "hard-shadow-rounded-sm": HardShadowRoundedSm,
  "hard-shadow-rounded-lg": HardShadowRoundedLg,
  "custom-1": CustomButtonOne,
  "custom-2": CustomButtonTwo,
  "custom-3": CustomButtonThree,
}
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

  return (
    <Button
      style={{
        "--button-color": buttonColor,
        "--text-color": textColor,
      }}
      className="link-preview default"
      {...(block.url ? { href: block.url, rel: "noopener noreferrer" } : { component: "div" })}>
      <div className="button-inner">
        <Box w={32}>
          <Image
            radius={"50%"}
            src={block.image}
            fallbackSrc={BlocksInArray.find((b) => b.name === block.type).icon}
            alt="thumbnail"
          />
        </Box>
        <Text lineClamp={1}>{block.title || "Untitled"}</Text>
        <span></span>
      </div>
    </Button>
  )
}

export default Default
