import { useState } from "react"
import { Group, Radio, Stack, Text } from "@mantine/core"
import { useTranslation } from "react-i18next"

import Error from "../../common/error"
import Loader from "../../common/loader"
import CreateCustomTheme from "./create-custom-theme"
import { ThemePreview } from "./theme-preview"

const Themes = ({ bioPageThemesQuery, data }) => {
  const { t } = useTranslation()
  const { status, data: themes } = bioPageThemesQuery
  const [value, setValue] = useState(data.bio_page_theme.id + "")

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  return (
    <>
      <Stack gap={"xl"}>
        <Text size="xl">{t("bioPages.appearance.themes.title")}</Text>
        <Radio.Group value={value} onChange={setValue}>
          <Group px={{ base: "md", md: "lg" }} gap={"lg"}>
            <Stack>
              <Radio.Card className="theme-preview" radius="md" value={"custom"}>
                <Radio.Indicator className="indicator" />
                <Text ta={"center"}>Create your Theme</Text>
              </Radio.Card>
              <Text ta={"center"} size="sm">
                Create your theme
              </Text>
            </Stack>
            {themes.data.map((theme) => (
              <ThemePreview key={theme.name} theme={theme} />
            ))}
          </Group>
        </Radio.Group>
      </Stack>
      {value === "custom" ? <CreateCustomTheme /> : null}
    </>
  )
}

export default Themes
