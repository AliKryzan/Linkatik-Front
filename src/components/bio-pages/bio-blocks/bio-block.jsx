import { memo } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { Box, Group, Stack } from "@mantine/core"
import { GripVertical } from "lucide-react"

import { useActiveBlock } from "@/contexts/active-block-context"
import ActivationSwitch from "./activation-switch"
import BioBlockTabs from "./block-tabs"
import TitleInput from "./title-input"
import UrlInput from "./url-input"

const BioBlock = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  })

  const { activeBlockId, isBlockActive } = useActiveBlock()
  const isActive = isBlockActive(block.id)
  const shouldBlur = activeBlockId !== null && !isActive

  const style = {
    transform: `translateY(${transform?.y || 0}px)`,
    transition,
    position: "relative",
    zIndex: isDragging ? 10 : isActive ? 5 : 1,
    filter: shouldBlur ? "blur(2px)" : "none",
    opacity: shouldBlur ? 0.7 : 1,
    transition: "filter 0.3s ease, opacity 0.3s ease",
  }

  return (
    <Stack ref={setNodeRef} style={style} flex={1} gap={"xs"} className="bio-block-wrapper">
      <Group align="end" gap={"xs"} ps={"md"}>
        <GripVertical
          {...attributes}
          {...listeners}
          key={block.id}
          style={{
            cursor: "grab",
          }}
          className="drag-handle"
          color="gray"
        />

        <Box flex={1} pe={"lg"} pt={"lg"}>
          <TitleInput block={block} />
          <Group gap={"xl"}>
            <UrlInput block={block} />
            <ActivationSwitch block={block} />
          </Group>
        </Box>
      </Group>
      <BioBlockTabs block={block} />
    </Stack>
  )
}

export default memo(BioBlock)
