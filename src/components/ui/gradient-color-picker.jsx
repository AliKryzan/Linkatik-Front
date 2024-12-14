import React from "react"
import { Box, Group, Popover, Text, UnstyledButton, useMantineColorScheme } from "@mantine/core"
import { t } from "i18next"
import ColorPicker from "react-best-gradient-color-picker"

const GradientColorPicker = React.forwardRef(function GradientColorPicker({ value, onChange, ...props }) {
  const { colorScheme } = useMantineColorScheme()

  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <UnstyledButton>
          <Group gap={"sm"} wrap="nowrap">
            <Box
              style={{
                flexShrink: 0,
                width: "50px",
                height: "50px",
                background: value,
                borderRadius: "var(--mantine-radius-md)",
              }}></Box>
            <Box
              style={{
                borderRadius: "var(--mantine-radius-md)",
              }}
              bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
              py={"xs"}
              px="sm">
              <Text size="sm" fw={500}>
                {t("bioPages.appearance.themes.background")}
              </Text>
              <Text lh={2} size="sm">
                {value}
              </Text>
            </Box>
          </Group>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <div dir="ltr">
          <ColorPicker
            value={value}
            onChange={(value) => {
              // setValue(value)
              onChange?.(value)
            }}
            hideColorTypeBtns
            {...props}
          />
        </div>
      </Popover.Dropdown>
    </Popover>
  )
})

export default GradientColorPicker
