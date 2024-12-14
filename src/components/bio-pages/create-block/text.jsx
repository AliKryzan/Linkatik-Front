import { Textarea } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const TextBlock = () => {
  const { t } = useTranslation()

  const { formState, control } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        name="settings.content"
        render={({ field }) => (
          <Textarea
            size="md"
            rows={5}
            label={t("bioBlocks.createBlock.custom.text_block.content")}
            error={
              formState.errors.content?.message && t(`bioBlocks.errors.${formState.errors.content?.message}`)
            }
            {...field}
          />
        )}
      />
    </>
  )
}

export default TextBlock
