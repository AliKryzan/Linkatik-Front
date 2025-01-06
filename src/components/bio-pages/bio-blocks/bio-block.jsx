import { memo } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { Box, Group, Stack } from "@mantine/core"
import { GripVertical } from "lucide-react"

import ActivationSwitch from "./activation-switch"
import BioBlockTabs from "./block-tabs"
import TitleInput from "./title-input"
import UrlInput from "./url-input"

const BioBlock = ({ block }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  })

  const style = {
    transform: `translateY(${transform?.y || 0}px)`,
    transition,
    position: "relative",
    zIndex: isDragging ? 10 : 1,
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
