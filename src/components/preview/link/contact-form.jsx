import { Button, Select, Stack, Text, Textarea, TextInput } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"

const ContactForm = ({ block }) => {
  const form = useForm({})
  const onSubmit = form.handleSubmit(async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
  })

  return (
    <Stack gap="xl" component={"form"} className="link-preview contact-form" onSubmit={onSubmit}>
      <Text ta={"center"}>{block.title}</Text>

      <Stack>
        {block.settings?.name?.enabled && (
          <Controller
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <TextInput
                variant="filled"
                required={block.settings.name.required}
                placeholder="اسمك"
                {...field}
              />
            )}
          />
        )}
        {block.settings?.email_from?.enabled && (
          <Controller
            control={form.control}
            name={"email_from"}
            render={({ field }) => (
              <TextInput
                type="email"
                variant="filled"
                required={block.settings.email_from.required}
                placeholder="example@example.com"
                {...field}
              />
            )}
          />
        )}
        {block.settings?.phone?.enabled && (
          <Controller
            control={form.control}
            name={"phone"}
            render={({ field }) => (
              <TextInput
                variant="filled"
                required={block.settings.phone.required}
                placeholder="رقم الهاتف"
                {...field}
              />
            )}
          />
        )}
        {block.settings?.country?.enabled && (
          <Controller
            control={form.control}
            name={"country"}
            render={({ field }) => (
              <Select
                variant="filled"
                required={block.settings.country.required}
                data={["دولة 1", "دولة 2", "دولة 3", "دولة 4"]}
                placeholder="اختر دولة"
                {...field}
              />
            )}
          />
        )}
        {block.settings?.message?.enabled && (
          <Controller
            control={form.control}
            name={"message"}
            render={({ field }) => (
              <Textarea
                rows={4}
                placeholder="الرسالة"
                variant="filled"
                required={block.settings.message.required}
                {...field}
              />
            )}
          />
        )}
      </Stack>
      <Stack>
        <Text size="sm" ta={"center"}>
          By submitting your contact details, you are providing your data to Kryzan1 who may contact you.
        </Text>
        <Button color="gray">send</Button>
      </Stack>
    </Stack>
  )
}

export default ContactForm
