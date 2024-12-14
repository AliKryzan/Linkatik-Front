import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const EmailCollector = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form
  const { t } = useTranslation()
  return (
    <>
      <Controller
        control={control}
        name="settings.email"
        render={({ field }) => (
          <TextInput
            size="md"
            type="email"
            label={t("bioBlocks.createBlock.custom.email_collector.email")}
            error={
              errors.settings?.email?.message && t(`bioBlocks.errors.${errors.settings?.email?.message}`)
            }
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="settings.name"
        render={({ field }) => (
          <TextInput
            size="md"
            label={t("bioBlocks.createBlock.custom.email_collector.name")}
            error={errors.settings?.name?.message && t(`bioBlocks.errors.${errors.settings?.name?.message}`)}
            {...field}
          />
        )}
      />
    </>
  )
}

export default EmailCollector
