import { Select, TextInput } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const CreateBioBlockForm = () => {
  const { t } = useTranslation()

  const { formState, control } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput
            size="md"
            label={t("bioBlocks.createBlock.custom.header.title")}
            error={
              formState.errors.title?.message && t(`bioBlocks.errors.${formState.errors.title?.message}`)
            }
            {...field}
          />
        )}
      />
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

export default CreateBioBlockForm
