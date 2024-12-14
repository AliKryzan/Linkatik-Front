import { Stack, Textarea } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const TextBlockSettings = ({ form }) => {
  const { control, formState } = form
  const { t } = useTranslation()
  return (
    <Stack>
      <Controller
        control={control}
        name="settings.content"
        render={({ field }) => (
          <Textarea
            size="md"
            rows={5}
            label={t("bioBlocks.createBlock.custom.text_block.content")}
            error={
              formState.errors.settings?.content?.message &&
              t(`bioBlocks.errors.${formState.errors.settings.content?.message}`)
            }
            {...field}
          />
        )}
      />
    </Stack>
  )
}

export default TextBlockSettings
