import { useEffect } from "react"
import { Box, ColorInput, Group, Select, Space, Stack, Text, useMantineColorScheme } from "@mantine/core"
import { LetterTextIcon } from "lucide-react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const Font = ({ form }) => {
  const { t } = useTranslation()
  const { control } = form
  const { colorScheme } = useMantineColorScheme()
  const { main_button_color, main_text_color } = useSelector((state) => state.GeneralSlice)
  return (
    <>
      <Space />
      <Stack gap={"xl"}>
        <Stack gap={"sm"}>
          <Text size="xl">{t("bioPages.appearance.themes.font")}</Text>
          <Stack className="box">
            <Controller
              name="bio_page.font"
              control={control}
              render={({ field }) => (
                <Select
                  label={t("bioPages.appearance.themes.style")}
                  classNames={{
                    input: "!h-15 !ps-13",
                  }}
                  data={[
                    { value: "Tajawal", label: "Tajawal" },
                    { value: "light", label: t("bioPages.appearance.themes.light") },
                  ]}
                  leftSection={
                    <div className="ms-4 rounded-xl bg-gray-200 px-3 py-2 text-lg text-black">Aa</div>
                  }
                  {...field}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
            <Controller
              key={"bio_link.text_color"}
              name="bio_link.text_color"
              control={control}
              render={({ field }) => {
                useEffect(() => {
                  if (!field.value) {
                    field.onChange(main_text_color)
                  }
                }, [main_text_color])
                return (
                  <div className="grid gap-0">
                    <Text size="sm" mb="xs">
                      {t("bioPages.appearance.themes.form.text-color")}
                    </Text>
                    <Box
                      style={{
                        borderRadius: "var(--mantine-radius-md)",
                      }}
                      bg={colorScheme === "dark" ? "dark.6" : "gray.0"}
                      px="sm">
                      <ColorInput
                        size="sm"
                        w={200}
                        format="hexa"
                        variant="unstyled"
                        defaultValue={field?.value || main_text_color}
                        onChange={(color) => field.onChange(color)}
                        {...field}
                      />
                    </Box>
                  </div>
                )
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Font
