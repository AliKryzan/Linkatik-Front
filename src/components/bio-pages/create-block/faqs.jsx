import { ActionIcon, Box, Button, Group, Textarea, TextInput } from "@mantine/core"
import { Plus, Trash2 } from "lucide-react"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

const TextBlock = () => {
  const { t } = useTranslation()

  const { control } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "settings.faqs", // unique name for your Field Array
  })

  return (
    <>
      {fields.map((field, index) => (
        <Group align="end" key={field.id}>
          <Box style={{ flexGrow: 1 }}>
            <Controller
              control={control}
              name={`settings.faqs.${index}.question`}
              render={({ field }) => (
                <TextInput size="md" label={t("bioBlocks.createBlock.custom.faq.question")} {...field} />
              )}
            />
            <Controller
              control={control}
              name={`settings.faqs.${index}.answer`}
              render={({ field }) => (
                <Textarea
                  size="md"
                  rows={4}
                  label={t("bioBlocks.createBlock.custom.faq.answer")}
                  {...field}
                />
              )}
            />
          </Box>
          <ActionIcon onClick={() => remove(index)} variant="light" color="red" size={"lg"}>
            <Trash2 size={18} />
          </ActionIcon>
        </Group>
      ))}

      <Group justify="flex-end">
        <Button
          variant="outline"
          size="sm"
          leftSection={<Plus />}
          onClick={() => append({ question: "", answer: "" })}>
          {t("bioBlocks.createBlock.custom.faq.add")}
        </Button>
      </Group>
    </>
  )
}

export default TextBlock
