import {
  Box,
  Button,
  ColorInput,
  Group,
  Select,
  Slider,
  Space,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { getScale } from "../../../utils/get-scale"
import { getShadow } from "../../../utils/get-shadow"

const Buttons = ({ form }) => {
  const { t } = useTranslation()
  const { control } = form
  const { colorScheme } = useMantineColorScheme()

  return (
    <>
      <Space />
      <Stack gap={"xl"}>
        <Stack gap={"sm"}>
          <Text size="xl">{t("bioPages.appearance.themes.form.buttons")}</Text>
          <Stack className="box">
            <Group grow gap={"xl"}>
              <Stack gap={"xl"}>
                <Controller
                  name="bio_link.variant"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label={t("bioPages.appearance.themes.style")}
                      data={[
                        { value: "filled", label: t("bioPages.appearance.themes.filled") },
                        { value: "outline", label: t("bioPages.appearance.themes.outline") },
                        { value: "light", label: t("bioPages.appearance.themes.light") },
                        { value: "transparent", label: t("bioPages.appearance.themes.transparent") },
                      ]}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="bio_link.color"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Group gap={"sm"}>
                        <Box
                          style={{
                            width: "40px",
                            height: "40px",
                            background: form.watch("bio_link.color"),
                            borderRadius: "var(--mantine-radius-md)",
                          }}></Box>
                        <Box
                          style={{
                            borderRadius: "var(--mantine-radius-md)",
                          }}
                          bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
                          // bg={"gray.0"}
                          px="sm">
                          <ColorInput
                            size="sm"
                            w={200}
                            leftSection={"HEX"}
                            variant="unstyled"
                            // label={t("bioPages.appearance.themes.color")}
                            {...field}
                          />
                        </Box>
                      </Group>
                    )
                  }}
                />
                <div>
                  <Text size="md">{t("bioPages.appearance.themes.radius")}</Text>

                  <Controller
                    name="bio_link.radius"
                    control={control}
                    render={({ field }) => (
                      <Slider
                        step={25}
                        scale={getScale}
                        marks={[{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div>
                  <Text size="md">{t("bioPages.appearance.themes.size")}</Text>

                  <Controller
                    name="bio_link.size"
                    control={control}
                    render={({ field }) => (
                      <Slider
                        step={25}
                        scale={getScale}
                        marks={[{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div>
                  <Text size="md">{t("bioPages.appearance.themes.shadow")}</Text>

                  <Controller
                    name="bio_link.shadow"
                    control={control}
                    render={({ field }) => (
                      <Slider
                        step={25}
                        scale={getScale}
                        marks={[{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Stack>
              <Stack align="center" justify="center">
                <Button
                  maw={380}
                  autoContrast
                  fullWidth
                  style={{ boxShadow: getShadow(form.watch("bio_link.shadow")) }}
                  variant={form.watch("bio_link.variant")}
                  color={form.watch("bio_link.color")}
                  radius={getScale(form.watch("bio_link.radius"))}
                  size={getScale(form.watch("bio_link.size"))}>
                  {t("bioPages.appearance.themes.preview")}
                </Button>
              </Stack>
            </Group>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Buttons
