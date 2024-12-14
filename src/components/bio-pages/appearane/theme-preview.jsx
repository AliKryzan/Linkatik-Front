import { Radio, Stack, Text } from "@mantine/core"

export const ThemePreview = ({ theme, style }) => {
  return (
    <Stack>
      <Radio.Card style={style} className="theme-preview" radius="md" value={theme.id + ""} key={theme.id}>
        <Radio.Indicator className="indicator" />
        {theme.id === "custom" ? <Text ta={"center"}>Create your Theme</Text> : ""}
      </Radio.Card>
      <Text ta={"center"} size="sm">
        {theme.name}
      </Text>
    </Stack>
  )
}
