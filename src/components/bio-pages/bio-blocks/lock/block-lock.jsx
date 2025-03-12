import { useState } from "react"
import { PutUpdateBlock } from "@/services/utils"
import { BioBlockLockSchema } from "@/validation/bio-block"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Accordion, Alert, Button, Checkbox, Group, PinInput, Stack, Text, TextInput } from "@mantine/core"
import { CircleAlert } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

const BlockLock = ({ block }) => {
  const { id } = useParams()
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(BioBlockLockSchema),
    defaultValues: {
      birthday_year: block.lock_options?.birthday_year
        ? String(new Date().getFullYear() - block.lock_options?.birthday_year)
        : "",
      show_with_code: block.lock_options?.show_with_code || false,
      code_confirmation: block.lock_options?.code_confirmation
        ? block.lock_options.code_confirmation + ""
        : "",
      show_with_birthday: block.lock_options?.show_with_birthday || false,
      show_with_subscribe: block.lock_options?.show_with_subscribe || false,
      show_with_sensitive_content: block.lock_options?.show_with_sensitive_content || false,
    },
  })
  const { handleSubmit, control, formState, setError } = form
  const onSubmit = handleSubmit(async (data) => {
    try {
      await PutUpdateBlock({
        pageId: id,
        blockId: block.id,
        data: {
          type: block.type,
          lock_options: {
            ...data,
            birthday_year: data.birthday_year ? new Date().getFullYear() - data.birthday_year : null,
          },
          image: block.image, // Preserve the existing image
        },
      })

      // Create a message describing which lock options were selected
      const enabledOptions = []
      if (data.show_with_subscribe) enabledOptions.push(t("bioBlocks.tabs.lock.form.show_with_subscribe"))
      if (data.show_with_code) enabledOptions.push(t("bioBlocks.tabs.lock.form.show_with_code"))
      if (data.show_with_birthday) enabledOptions.push(t("bioBlocks.tabs.lock.form.show_with_birthday"))
      if (data.show_with_sensitive_content)
        enabledOptions.push(t("bioBlocks.tabs.lock.form.show_with_sensitive_content"))

      // Display success toast with selected options
      const successMessage =
        enabledOptions.length > 0
          ? t("bioBlocks.tabs.lock.successMessage", {
              defaultValue: `Lock settings saved with: ${enabledOptions.join(", ")}`,
              options: enabledOptions.join(", "),
            })
          : t("bioBlocks.tabs.lock.successMessageEmpty", {
              defaultValue: "Lock settings saved successfully",
            })

      toast.success(successMessage, {
        position: "top-center",
      })
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", {
        message: error?.response?.data?.message || error?.response?.message || error.message,
      })
    }
  })

  const [value, setValue] = useState([])

  const elements = [
    {
      value: "show_with_subscribe",
      component: null,
    },
    {
      value: "show_with_code",
      component: (
        <>
          <Group>
            <Controller
              name="code_confirmation"
              control={control}
              render={({ field }) => (
                <div>
                  <PinInput placeholder="" type="number" {...field} />
                  {formState.errors.code_confirmation?.message && (
                    <Text mt={"md"} c={"red"} size="xs">
                      {t(`bioBlocks.tabs.lock.form.errors.${formState.errors.code_confirmation?.message}`)}
                    </Text>
                  )}
                </div>
              )}
            />
          </Group>
          {form.watch("code_confirmation").length < 4 && (
            <Alert
              variant="light"
              color="red"
              title={t("bioBlocks.tabs.lock.alerts.show_with_code")}
              icon={<CircleAlert />}>
              {t("bioBlocks.tabs.lock.alerts.show_with_code_d")}
            </Alert>
          )}
        </>
      ),
    },
    {
      value: "show_with_birthday",
      component: (
        <>
          <div>
            <Controller
              name="birthday_year"
              control={control}
              render={({ field }) => (
                <TextInput
                  w={"50%"}
                  variant="filled"
                  type="number"
                  min={1}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === ".") {
                      e.preventDefault()
                    }
                  }}
                  onInput={(e) => {
                    if (e.target.value < 1) {
                      e.target.value = 1
                    }
                  }}
                  label={t("bioBlocks.tabs.lock.form.birthday_year_label", {
                    defaultValue: formState.errors.birthday_year?.message,
                  })}
                  error={
                    formState.errors.birthday_year?.message &&
                    t(`bioBlocks.tabs.lock.form.errors.${formState.errors.birthday_year?.message}`)
                  }
                  {...field}
                  onChange={(e) => form.setValue("birthday_year", String(e.target.value))}
                />
              )}
            />
          </div>
          {!form.watch("birthday_year") && (
            <Alert
              variant="light"
              color="red"
              title={t("bioBlocks.tabs.lock.alerts.show_with_birthday")}
              icon={<CircleAlert />}>
              {t("bioBlocks.tabs.lock.alerts.show_with_birthday_d")}
            </Alert>
          )}
        </>
      ),
    },
    {
      value: "show_with_sensitive_content",
      component: null,
    },
  ]
  console.log(form.formState.errors)
  return (
    <Stack p={"lg"} component={"form"} onSubmit={onSubmit} noValidate>
      <div>
        <Text size="lg" fw={500}>
          {t("bioBlocks.tabs.lock.title")}
        </Text>
        <Text size="sm" c="gray.8">
          {t("bioBlocks.tabs.lock.description")}
        </Text>
      </div>

      <Accordion multiple value={value} onChange={setValue} variant="separated" defaultValue="Apples">
        {elements.map(({ value, component }) => (
          <Accordion.Item key={value} value={value}>
            <Accordion.Control
              icon={
                <Controller
                  control={control}
                  name={value}
                  render={({ field }) => (
                    <Checkbox checked={field.value} color="black" radius={"xs"} {...field} />
                  )}
                />
              }>
              {t(`bioBlocks.tabs.lock.form.${value}`)}
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <Text size="sm" c={"gray.8"}>
                  {t(`bioBlocks.tabs.lock.form.${value}_d`)}
                </Text>
                {component}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <Button loading={formState.isSubmitting} type="submit" radius={"xl"}>
        {t("bioBlocks.tabs.lock.form.button")}
      </Button>
      {formState.errors.root?.message && (
        <Text c={"red"} size="xs" ta={"center"}>
          {formState.errors.root?.message}
        </Text>
      )}
      {/* <DevTool control={control} /> */}
    </Stack>
  )
}

export default BlockLock
