import { TextInput } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const SocialBlock = () => {
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

  const { formState, control } = useFormContext()
  console.log("Controller9999999999999999999999999999999999999999999999999999999999999999999")
  console.log(formState.errors)
  return (
    <>
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
                  formState?.errors?.settings?.[element]?.message &&
                  t(`bioBlocks.errors.${formState?.errors?.settings[element]?.message}`)
                }
                {...field}
              />
            )}
          />
        )
      })}
    </>
  )
}

export default SocialBlock
