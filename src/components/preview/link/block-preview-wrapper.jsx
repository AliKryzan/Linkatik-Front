import { Skeleton } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"

import { GetBlockPreview } from "../../../services/utils"
import Error from "../../common/error"
import RenderBlock from "./render-block"

const BlockPreviewWrapper = ({ theme, block, pageId }) => {
  const { data, status } = useQuery({
    queryKey: ["bio-block-preview", block.id, pageId],
    queryFn: () => GetBlockPreview(pageId, block.id),
  })
  if (status === "pending") return <Skeleton height={50} radius={"xl"} />
  if (status === "error") return <Error />
  // if (status === "success" && !data) return <Error />
  const blockData = data.data
  return <RenderBlock theme={theme} block={blockData} pageId={pageId} />
}

export default BlockPreviewWrapper
