import { Box, Image, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { BlocksInArray } from "../../../config/bio-blocks"
import { GetPageAppearance } from "../../../services/utils"
import SubscribeForm from "../../common/subscribe-form"
import { Buttons } from "./buttons"

const EmailCollector = ({ block }) => {
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
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <div
      style={{
        "--button-color": buttonColor,
        "--text-color": textColor,
      }}>
      <Button
        onClick={open}
        className="link-preview default"
        {...(block.url ? { href: block.url, rel: "noopener noreferrer" } : { component: "button" })}>
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
      <Modal.Root withinPortal={false} xOffset={"25px"} centered opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content
          style={{
            left: 0,
            right: 0,
          }}
          component={"div"}
          radius={"xl"}>
          <SubscribeForm title={block.title} />
        </Modal.Content>
      </Modal.Root>
    </div>
  )
}

export default EmailCollector
