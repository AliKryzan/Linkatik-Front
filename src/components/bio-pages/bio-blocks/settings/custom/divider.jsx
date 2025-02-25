import { Box, ColorInput, Group, Slider, Space, Stack, useMantineColorScheme } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const DividerBlockSettings = ({ form }) => {
  const { control, watch } = form
  const { t } = useTranslation()
  const { colorScheme } = useMantineColorScheme()

  return (
    <Stack gap={"xl"}>
      <Space />
      <Controller
        control={control}
        name="settings.margin_top"
        render={({ field }) => (
          <Slider
            marks={[
              { value: 0, label: "xs" },
              { value: 25, label: "sm" },
              { value: 50, label: "md" },
              { value: 75, label: "lg" },
              { value: 100, label: "xl" },
            ]}
            label={t("bioBlocks.createBlock.custom.divider.margin_top")}
            {...field}
          />
        )}
      />
      <Space />

      <Controller
        control={control}
        name="settings.margin_bottom"
        render={({ field }) => (
          <Slider
            marks={[
              { value: 0, label: "xs" },
              { value: 25, label: "sm" },
              { value: 50, label: "md" },
              { value: 75, label: "lg" },
              { value: 100, label: "xl" },
            ]}
            label={t("bioBlocks.createBlock.custom.divider.margin_bottom")}
            {...field}
          />
        )}
      />
      <Space />
      <Controller
        name="settings.color"
        control={control}
        render={({ field }) => {
          return (
            <Group gap={"sm"}>
              <Box
                style={{
                  width: "50px",
                  height: "50px",
                  background: watch("settings.color"),
                  borderRadius: "var(--mantine-radius-md)",
                }}></Box>
              <Box
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                }}
                bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
                px="sm">
                <ColorInput
                  size="sm"
                  w={200}
                  //leftSection={"HEXA"}
                  format="hexa"
                  variant="unstyled"
                  label={t("bioBlocks.createBlock.custom.divider.color")}
                  {...field}
                />
              </Box>
            </Group>
          )
        }}
      />
      <Space />
    </Stack>
  )
}

export default DividerBlockSettings
