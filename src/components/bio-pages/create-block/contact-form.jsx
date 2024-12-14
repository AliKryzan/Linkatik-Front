import { Checkbox, Divider, Group, Stack, Switch, Text, TextInput } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

export const contactFormFields = ["name", "email_from", "phone", "message", "country"]
const ContactForm = () => {
  const { t } = useTranslation()

  const { control, formState, watch } = useFormContext()

  return (
    <>
      <div>
        <Text fw={"bold"}>{t("bioBlocks.createBlock.custom.contactForm.title")}</Text>
        <Text size={"sm"} c="gray.8">
          {t("bioBlocks.createBlock.custom.contactForm.description")}
        </Text>
      </div>

      <Stack gap={"xs"}>
        <Group justify="end">
          <Text size="sm">مطلوب</Text>
        </Group>

        {contactFormFields.map((fieldKey) => {
          return (
            <div key={fieldKey}>
              <Group py={"md"} justify="space-between">
                <Controller
                  control={control}
                  name={`settings.${fieldKey}.enabled`}
                  render={({ field }) => {
                    return (
                      <Switch
                        checked={watch(`settings.${fieldKey}.enabled`)}
                        label={t(`bioBlocks.createBlock.custom.contactForm.form.${fieldKey}`)}
                        {...field}
                      />
                    )
                  }}
                />
                <Controller
                  control={control}
                  name={`settings.${fieldKey}.required`}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        radius={"xs"}
                        checked={watch(`settings.${fieldKey}.required`)}
                        color="black"
                        {...field}
                      />
                    )
                  }}
                />
              </Group>
              <Divider />
            </div>
          )
        })}
        {formState.errors.settings?.settings_root?.message && (
          <Text c={"red"} size="xs" ta={"center"}>
            {t(`bioBlocks.createBlock.${formState.errors.settings?.settings_root?.message}`)}
          </Text>
        )}
      </Stack>
      <Controller
        control={control}
        name={`title`}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              label={t(`bioBlocks.createBlock.custom.contactForm.form.title`)}
              error={
                formState.errors?.title?.message &&
                t(`bioBlocks.createBlock.${formState.errors.title?.message}`)
              }
              {...field}
            />
          )
        }}
      />
      <Controller
        control={control}
        name={`settings.email_to`}
        render={({ field }) => {
          return (
            <TextInput
              type="email"
              variant="filled"
              label={t(`bioBlocks.createBlock.custom.contactForm.form.email_to`)}
              placeholder="you@example.com"
              description={t(`bioBlocks.createBlock.custom.contactForm.form.email_to_description`)}
              error={
                formState.errors.settings?.email_to?.message &&
                t(`bioBlocks.createBlock.${formState.errors.settings.email_to?.message}`)
              }
              {...field}
            />
          )
        }}
      />
      <Controller
        control={control}
        name={`settings.thank_you_message`}
        render={({ field }) => {
          return (
            <TextInput
              variant="filled"
              label={t(`bioBlocks.createBlock.custom.contactForm.form.thank_you_message`)}
              error={
                formState.errors.settings?.thank_you_message?.message &&
                t(`bioBlocks.createBlock.${formState.errors.settings.thank_you_message?.message}`)
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
