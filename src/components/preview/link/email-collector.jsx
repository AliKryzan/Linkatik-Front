import { Box, Button, Image, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { BlocksInArray } from "../../../config/bio-blocks"
import { GetPageAppearance } from "../../../services/utils"
import SubscribeForm from "../../common/subscribe-form"

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
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Button
        rightSection={<Box w={32}></Box>}
        leftSection={
          <Box w={32}>
            <Image
              radius={"50%"}
              src={block.image}
              fallbackSrc={BlocksInArray.find((b) => b.name === block.type).icon}
              alt="thumbnail"
            />
          </Box>
        }
        justify="space-between"
        autoContrast
        size={theme?.size || "md"}
        radius={theme?.radius || "xl"}
        variant={theme?.variant || "filled"}
        color={theme?.color || "#fcf3d8"}
        style={{ boxShadow: theme?.shadow }}
        className="link-preview default"
        onClick={open}>
        {block.title || "Untitled"}
      </Button>
      <Modal.Root centered opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content component={"div"} radius={"xl"}>
          <SubscribeForm title={block.title} />
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default EmailCollector
