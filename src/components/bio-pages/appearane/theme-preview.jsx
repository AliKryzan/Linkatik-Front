import { Box, Radio, Stack, Text } from "@mantine/core"

import { generateWebComponent } from "../../../utils/generate-web-component"
import RenderBackground from "../../common/render-background"
import { Buttons } from "../../preview/link/buttons"

export const ThemePreview = ({ theme, style }) => {
  if (style) {
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

  const Button = Buttons[theme.settings?.bio_link?.type ?? "filled"]
  const buttonColor = theme.settings?.bio_link?.button_color ?? `#fcf3d8`
  const textColor = theme.settings?.bio_link?.text_color ?? `#000000`
  const { html, css } = theme.settings.bio_page
  const encapsulated = generateWebComponent("custom-background-" + theme.id, html ?? "", css ?? "")

  return (
    <Stack>
      <Radio.Card
        p="0"
        className="theme-preview"
        radius="md"
        value={theme.id + ""}
        key={theme.id + theme.name}>
        <Radio.Indicator className="indicator" />
        <RenderBackground encapsulated={encapsulated} />
        <Stack
          justify="center"
          align="center"
          p="xs"
          style={{
            position: "absolute",
            zIndex: 1,
            inset: "0",
          }}>
          <Stack style={{ transform: "scale(0.35)", width: "350px" }}>
            <Button
              style={{
                "--button-color": buttonColor,
                "--text-color": textColor,
              }}
              className="link-preview default"
              component="div">
              <div className="button-inner">
                <Box w={32} h={32}></Box>
                <Text lineClamp={1}></Text>
                <span></span>
              </div>
            </Button>
            <Button
              style={{
                "--button-color": buttonColor,
                "--text-color": textColor,
              }}
              className="link-preview default"
              component="div">
              <div className="button-inner">
                {" "}
                <Box w={32} h={32}></Box>
                <Text lineClamp={1}></Text>
                <span></span>
              </div>
            </Button>
            <Button
              style={{
                "--button-color": buttonColor,
                "--text-color": textColor,
              }}
              className="link-preview default"
              component="div">
              <div className="button-inner">
                {" "}
                <Box w={32} h={32}></Box>
                <Text lineClamp={1}></Text>
                <span></span>
              </div>
            </Button>
          </Stack>
        </Stack>
      </Radio.Card>
      <Text ta={"center"} size="sm">
        {theme.name}
      </Text>
    </Stack>
  )
}
