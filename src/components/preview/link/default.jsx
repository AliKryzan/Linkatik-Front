import { Box, Button, Image } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { BlocksInArray } from "../../../config/bio-blocks"
import { GetPageAppearance } from "../../../services/utils"

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

  return (
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
      component="a"
      href={block.url}
      target="_blank"
      rel="noopener noreferrer">
      {block.title || "Untitled"}
    </Button>
  )
}

export default Default
