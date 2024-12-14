import { Stack, TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const SocialsSettings = ({ form }) => {
  const { control, formState } = form
  const {
    errors: { settings: settingsErrors },
  } = formState
  const { t } = useTranslation()
  const fields = [
    "email",
    "phone",
    "whatsapp",
    "telegram",
    "linkedin",
    "facebook",
    "twitter",
    "instagram",
    "youtube",
  ]
  return (
    <Stack>
      {fields.map((element) => {
        return (
          <Controller
            key={element}
            control={control}
            name={`settings.${element}`}
            render={({ field }) => (
              <TextInput
                type={element === "phone" ? "text" : element === "email" ? "email" : "url"}
                size="md"
                label={t(`bioBlocks.createBlock.custom.socials.${element}`)}
                error={
                  settingsErrors?.[element]?.message &&
                  t(`bioBlocks.errors.${settingsErrors[element]?.message}`)
                }
                {...field}
              />
            )}
          />
        )
      })}
    </Stack>
  )
}

export default SocialsSettings
