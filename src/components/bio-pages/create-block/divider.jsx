import { Slider, Space } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const DividerBlock = () => {
  const { t } = useTranslation()

  const { control } = useFormContext()

  return (
    <>
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
    </>
  )
}

export default DividerBlock
