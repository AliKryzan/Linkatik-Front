import { Radio, Stack, Text } from "@mantine/core"

import { generateWebComponent } from "../../../utils/generate-web-component"
import RenderBackground from "../../common/render-background"

export const ThemePreview = ({ theme }) => {
  const { html, css } = theme.settings.bio_page
  const encapsulated = generateWebComponent("custom-background-" + theme.id, html ?? "", css ?? "")

  return (
    <Stack>
      <Radio.Card p="0" className="theme-preview" radius="md" value={theme.id + ""} key={theme.id}>
        <Radio.Indicator className="indicator" />
        <RenderBackground encapsulated={encapsulated} />
      </Radio.Card>
      <Text ta={"center"} size="sm">
        {theme.name}
      </Text>
    </Stack>
  )
}
