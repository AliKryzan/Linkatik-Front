import { ActionIcon, Box, Button, Group, Stack, Textarea, TextInput } from "@mantine/core"
import { Plus, Trash2 } from "lucide-react"
import { Controller, useFieldArray } from "react-hook-form"
import { useTranslation } from "react-i18next"

const TextBlock = ({ form }) => {
  const { t } = useTranslation()

  const { formState, control } = form
  console.log("🚀 ~ TextBlock ~ formState:", formState.errors)
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "settings.faqs", // unique name for your Field Array
  })

  return (
    <>
      <Stack>
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
      </Stack>
    </>
  )
}

export default TextBlock
