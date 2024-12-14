import { TextInput } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const EmailCollector = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()
  console.log("🚀 ~ EmailCollector ~ errors:", errors)
  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput
            size="md"
            label={t("bioBlocks.createBlock.titleInputLabel")}
            error={errors.title?.message && t(`bioBlocks.errors.${errors.title?.message}`)}
            {...field}
          />
        )}
      />
    </>
  )
}

export default EmailCollector
