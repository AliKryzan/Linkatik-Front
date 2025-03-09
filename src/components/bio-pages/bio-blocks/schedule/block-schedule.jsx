import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Stack, Text } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { PutUpdateBlock } from "@/services/utils"
import { BioBlockScheduleSchema } from "@/validation/bio-block"
import CustomDateTimePicker from "../../../ui/custom-date-time-picker"

// import CustomSelect from "../../../ui/custom-select"

const BlockSchedule = ({ block }) => {
  const { id } = useParams()
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(BioBlockScheduleSchema),
    defaultValues: {
      start_date: block.schedule?.start_date ? new Date(block.schedule.start_date) : "",
      end_date: block.schedule?.end_date ? new Date(block.schedule.end_date) : "",
      // timezone: block.schedule.timezone,
    },
  })
  const { handleSubmit, control, formState, setError } = form
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await PutUpdateBlock({
        pageId: id,
        blockId: block.id,
        data: {
          type: block.type,
          schedule: { ...data, is_enable: true },
          image: block.image, // Preserve the existing image
        },
      })
      console.log("🚀 ~ onSubmit ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: error.response?.data?.message || error.response?.message || error.message })
    }
  })
  return (
    <Stack p={"lg"} component={"form"} onSubmit={onSubmit} noValidate>
      <div>
        <Text size="lg" fw={500}>
          {t("bioBlocks.tabs.schedule.title")}
        </Text>
        <Text size="sm" c="gray.8">
          {t("bioBlocks.tabs.schedule.description")}
        </Text>
      </div>

      <Group grow>
        <Controller
          control={control}
          name="start_date"
          render={({ field }) => (
            <CustomDateTimePicker
              minDate={new Date()}
              variant="filled"
              label={t("bioBlocks.tabs.schedule.form.start_date")}
              error={
                formState.errors.start_date?.message &&
                t(`bioBlocks.tabs.schedule.form.errors.${formState.errors.start_date?.message}`)
              }
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="end_date"
          render={({ field }) => (
            <CustomDateTimePicker
              minDate={form.watch("start_date")}
              onChange={(date) => {
                field.onChange(date.toString())
              }}
              variant="filled"
              label={t("bioBlocks.tabs.schedule.form.end_date")}
              error={
                formState.errors.end_date?.message &&
                t(`bioBlocks.tabs.schedule.form.errors.${formState.errors.end_date?.message}`)
              }
              {...field}
            />
          )}
        />
      </Group>
      {/* <Controller
        control={control}
        name={"timezone"}
        render={({ field }) => (
          <CustomSelect
            label={t("bioBlocks.tabs.schedule.form.timezone")}
            error={
              formState.errors.timezone?.message &&
              t(`bioBlocks.tabs.schedule.form.errors.${formState.errors.timezone?.message}`)
            }
            data={["GMT", "UTC"]}
            {...field}
          />
        )}
      /> */}

      <Button loading={formState.isSubmitting} type="submit" radius={"xl"}>
        {t("bioBlocks.tabs.schedule.form.button")}
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

export default BlockSchedule
