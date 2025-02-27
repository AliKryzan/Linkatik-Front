import { memo, useState } from "react"
import { PutUpdateBlock } from "@/services/utils"
import { getTextWidth } from "@/utils/get-text-width"
import { Box, rem, TextInput, Tooltip, useDirection, useMantineTheme } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"
import { Loader2, Pen } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import useDebouncedMutation from "@/hooks/use-debounced-mutation"

const TitleInput = ({ block }) => {
  const { t } = useTranslation()
  const { id: pageId } = useParams()
  const theme = useMantineTheme()

  const { ref, width } = useElementSize()
  const [value, setValue] = useState(block.title || t(`bioBlocks.blocks.${block.type}`))

  const { mutate, loading } = useDebouncedMutation({
    mutateFn: PutUpdateBlock,
  })

  const handleChange = (event) => {
    setValue(event.currentTarget.value)
    mutate({
      pageId,
      blockId: block.id,
      data: {
        type: block.type,
        title: event.currentTarget.value.trim(),
      },
    })
  }
  const { dir } = useDirection()

  return (
    <Box pe={"lg"} style={{ position: "relative" }}>
      <TextInput
        ref={ref}
        styles={{
          input: {
            height: rem("36px"),
            minHeight: "unset",
          },
        }}
        size="lg"
        leftSection={
          loading ? (
            <Loader2 size={14} className="spinner" color={theme.colors.gray[3]} />
          ) : (
            <Pen size={16} color={theme.colors.gray[3]} />
          )
        }
        name="title"
        variant="unstyled"
        onChange={handleChange}
        value={value}
      />
    </Box>
  )
}

export default memo(TitleInput)
