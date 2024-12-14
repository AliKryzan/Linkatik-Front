import { memo } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { Box, Group, Stack, Text } from "@mantine/core"
import { GripVertical } from "lucide-react"
import { useTranslation } from "react-i18next"

import ActivationSwitch from "./activation-switch"
import { BioBlockTabLoader } from "./bio-block-tab-loader"
import BioBlockTabs from "./block-tabs"
import DeleteBioBlockButton from "./delete-block-button"
import TitleInput from "./title-input"
import UrlInput from "./url-input"

const BioBlock = ({ block }) => {
  const { t } = useTranslation()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  })

  const style = {
    transform: `translateY(${transform?.y || 0}px)`,
    transition,
    position: "relative",
    zIndex: isDragging ? 10 : 1,
  }

  if (block.type === "divider") {
    return (
      <Stack flex={1} ref={setNodeRef} style={style} gap={"xs"} className="bio-block-wrapper">
        <Group align="end" gap={"xs"} ps={"md"}>
          <GripVertical
            {...attributes}
            {...listeners}
            key={block.id}
            style={{
              cursor: "grab",
            }}
            color="gray"
          />

          <Group flex={1} pe={"lg"} py={"lg"} justify="space-between">
            <Text size="lg">{t(`bioBlocks.blocks.${block.type}`)}</Text>

            <Group>
              <DeleteBioBlockButton blockId={block.id} />
              <ActivationSwitch block={block} />
            </Group>
          </Group>
        </Group>
        <div>
          <BioBlockTabLoader componentKey={"settings"} block={block} />
        </div>
      </Stack>
    )
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
