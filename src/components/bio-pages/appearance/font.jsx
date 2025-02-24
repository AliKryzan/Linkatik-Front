import { Select, Space, Stack, Text } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const Font = ({ form }) => {
  const { t } = useTranslation()
  const { control } = form

  return (
    <>
      <Space />
      <Stack gap={"xl"}>
        <Stack gap={"sm"}>
          <Text size="xl">{t("bioPages.appearance.themes.font")}</Text>
          <Stack className="box">
            {" "}
            <Controller
              name="bio_page.font"
              control={control}
              render={({ field }) => (
                <Select
                  label={t("bioPages.appearance.themes.style")}
                  data={[
                    { value: "Tajawal", label: "Tajawal" },
                    { value: "light", label: t("bioPages.appearance.themes.light") },
                  ]}
                  {...field}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Font
