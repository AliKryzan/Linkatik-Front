import { Select } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const HeaderBlockSettings = ({ form }) => {
  const { control, formState } = form
  const { t } = useTranslation()
  return (
    <>
      <Controller
        control={control}
        name="settings.type"
        render={({ field }) => (
          <Select
            data={[
              { value: "large", label: t("bioBlocks.createBlock.custom.header.large") },
              { value: "medium", label: t("bioBlocks.createBlock.custom.header.medium") },
              { value: "small", label: t("bioBlocks.createBlock.custom.header.small") },
            ]}
            size="md"
            label={t("bioBlocks.createBlock.custom.header.type")}
            error={
              formState.errors.settings?.type?.message &&
              t(`bioBlocks.errors.${formState.errors.settings.type?.message}`)
            }
            {...field}
          />
        )}
      />
    </>
  )
}

export default HeaderBlockSettings
