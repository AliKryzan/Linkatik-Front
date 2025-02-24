import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack, Text, TextInput } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { PostSubscribe } from "@/services/utils"
import { subscribeSchema } from "@/validation/subscribe"

const SubscribeForm = ({ title, bio_page_id, close }) => {
  const form = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  })
  console.log("🚀 ~ SubscribeForm ~ form:", form.formState.errors)

  const onSubmit = form.handleSubmit(async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    try {
      await PostSubscribe({ ...data, bio_page_id })
      close?.()
    } catch (error) {
      form.setError("root", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })

      console.log("🚀 ~ onSubmit ~ error:", error)
    }
  })
  const { t } = useTranslation()
  return (
    <Stack gap="xl" component={"form"} className="link-preview subscribe-form" onSubmit={onSubmit}>
      <Text ta={"center"}>{title}</Text>

      <Stack>
        <Controller
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <TextInput
              variant="filled"
              placeholder="اسمك"
              error={
                form.formState.errors.name &&
                t(`subscribe.form.errors.${form.formState.errors.name?.message}`)
              }
              {...field}
            />
          )}
        />
        <Controller
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <TextInput
              type="email"
              variant="filled"
              placeholder="example@example.com"
              error={
                form.formState.errors.email &&
                t(`subscribe.form.errors.${form.formState.errors.email?.message}`)
              }
              {...field}
            />
          )}
        />
      </Stack>
      <Stack>
        <Button loading={form.formState.isSubmitting} type="submit" color="gray">
          {t(`subscribe.form.button`)}
        </Button>
        {form.formState.errors?.root && (
          <Text c={"red"} size="xs" ta={"center"}>
            {form.formState.errors.root.message}
          </Text>
        )}
      </Stack>
    </Stack>
  )
}

export default SubscribeForm
