import { memo, useState } from "react"
import { PutUpdateBlock } from "@/services/utils"
import { getTextWidth } from "@/utils/get-text-width"
import { TextInput, Tooltip, useDirection, useMantineTheme } from "@mantine/core"
import { useElementSize } from "@mantine/hooks"
import { Loader2, Pen } from "lucide-react"
import { useParams } from "react-router-dom"

import useDebouncedMutation from "@/hooks/use-debounced-mutation"

const UrlInput = ({ block }) => {
  const { id: pageId } = useParams()
  const theme = useMantineTheme()
  const { ref, width } = useElementSize()
  const [value, setValue] = useState(block.url)
  // const [blockUrl, setBlockUrl] = useState(block.url)

  const { mutate, loading, error } = useDebouncedMutation({ mutateFn: PutUpdateBlock })

  const handleChange = (event) => {
    setValue(event.currentTarget.value)
    mutate({
      pageId,
      blockId: block.id,
      data: {
        type: block.type,
        url: event.currentTarget.value.trim(),
      },
    })
  }
  const { dir } = useDirection()

  if (!block.url) return <div style={{ flex: 1, position: "relative" }}></div>
  return (
    <div style={{ flex: 1, position: "relative" }}>
      <TextInput
        name="url"
        variant="unstyled"
        size="md"
        styles={{ input: { color: theme.colors.gray[6] } }}
        onChange={handleChange}
        value={value}
        leftSection={
          loading ? (
            <Loader2 size={14} className="spinner" color={theme.colors.gray[3]} />
          ) : (
            <Pen size={16} color={theme.colors.gray[3]} />
          )
        }
      />
    </div>
  )
}

export default memo(UrlInput)
