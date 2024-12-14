import { TextInput } from "@mantine/core"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"

const ContactForm = ({ form }) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
  } = form

  return (
    <>
      <Controller
        control={control}
        name={`settings.first_name`}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              placeholder={t(`bioBlocks.createBlock.custom.vcard.first_name`)}
              error={
                errors.settings?.first_name?.message &&
                t(`bioBlocks.createBlock.${errors.settings.first_name?.message}`)
              }
              {...field}
            />
          )
        }}
      />
      <Controller
        control={control}
        name={`settings.last_name`}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              placeholder={t(`bioBlocks.createBlock.custom.vcard.last_name`)}
              error={
                errors.settings?.last_name?.message &&
                t(`bioBlocks.createBlock.${errors.settings.last_name?.message}`)
              }
              {...field}
            />
          )
        }}
      />
      <Controller
        control={control}
        name={`settings.email`}
        render={({ field }) => {
          return (
            <TextInput
              type="email"
              variant="filled"
              placeholder="you@example.com"
              error={
                errors.settings?.email?.message &&
                t(`bioBlocks.createBlock.${errors.settings.email?.message}`)
              }
              {...field}
            />
          )
        }}
      />
      <Controller
        control={control}
        name={`settings.phone`}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              placeholder={t(`bioBlocks.createBlock.custom.vcard.phone`)}
              error={
                errors.settings?.phone?.message &&
                t(`bioBlocks.createBlock.${errors.settings.phone?.message}`)
              }
              {...field}
            />
          )
        }}
      />
      <Controller
        control={control}
        name={`settings.address_street`}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              placeholder={t(`bioBlocks.createBlock.custom.vcard.address_street`)}
              error={
                errors.settings?.address_street?.message &&
                t(`bioBlocks.createBlock.${errors.settings.address_street?.message}`)
              }
              {...field}
            />
          )
        }}
      />
    </>
  )
}

export default ContactForm
