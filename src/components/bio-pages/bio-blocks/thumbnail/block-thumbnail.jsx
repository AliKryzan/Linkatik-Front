import { useState } from "react"
import { Button, Stack, Text } from "@mantine/core"
import { Trans, useTranslation } from "react-i18next"

import ThumbnailForm from "./thumbnail-form"

const BlockThumbnail = ({ block }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(block.image)

  const toggle = () => {
    setValue((pre) => !pre)
  }

  if (value) return <ThumbnailForm block={block} />
  return (
    <Stack p={"md"}>
      <Text c="gray.8" ta={"center"}>
        <Trans i18nKey="bioBlocks.tabs.thumbnail.description" components={{ br: <br /> }} />
      </Text>
      <Button onClick={() => toggle()} radius={"xl"}>
        {t("bioBlocks.tabs.thumbnail.button")}
      </Button>
    </Stack>
  )
}

export default BlockThumbnail
