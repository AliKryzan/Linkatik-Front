import { useState } from "react"
import { Button, Stack, Text } from "@mantine/core"
import { Trans, useTranslation } from "react-i18next"

import RedirectForm from "./redirect-form"

const BlockRedirect = ({ block }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(block.redirect?.is_enable)

  const toggle = () => {
    setValue((pre) => !pre)
  }
  if (value) return <RedirectForm block={block} />

  return (
    <Stack p={"md"}>
      <Text size="sm" c="gray.8" ta={"center"}>
        <Trans i18nKey="bioBlocks.tabs.redirect.description" components={{ br: <br /> }} />
      </Text>
      <Button onClick={() => toggle()} radius={"xl"}>
        {t("bioBlocks.tabs.redirect.button")}
      </Button>
    </Stack>
  )
}

export default BlockRedirect
