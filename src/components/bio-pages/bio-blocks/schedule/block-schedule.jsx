import { useEffect } from "react"
import { PutUpdateBlock } from "@/services/utils"
import { BioBlockScheduleSchema } from "@/validation/bio-block"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group, Stack, Text } from "@mantine/core"
import moment from "moment" // Import moment
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

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
  const { handleSubmit, control, formState, setError, watch } = form

  // Validation function to check if end date/time is after start date/time
  const validateDates = (startDate, endDate) => {
    if (!startDate || !endDate) return true

    const startMoment = moment(startDate)
    const endMoment = moment(endDate)
    return endMoment.isAfter(startMoment)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Validate that end date/time is after start date/time
      if (!validateDates(data.start_date, data.end_date)) {
        return setError("end_date", {
          message: "end_date_before_start_date",
        })
      }

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
      
      // Format dates for toast message
      const startFormatted = moment(data.start_date).format('MMM DD, YYYY [at] h:mm A')
      const endFormatted = moment(data.end_date).format('MMM DD, YYYY [at] h:mm A')
      
      // Show success toast with schedule information
      toast.success(t("bioBlocks.tabs.schedule.successMessage", {
        defaultValue: `Block will be displayed from ${startFormatted} to ${endFormatted}`,
        startFormatted,
        endFormatted,
      }),{
        position:"top-center"
      })
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: error.response?.data?.message || error.response?.message || error.message })
    }
  })

  // Get current start date for validation
  const startDate = watch("start_date")
  const endDate = watch("end_date")

  // Validate dates whenever either changes
  useEffect(() => {
    if (startDate && endDate) {
      const isValid = validateDates(startDate, endDate)
      console.log(isValid)

      if (!isValid) {
        form.setError("end_date", { message: "end_date_before_start_date" })
      } else {
        form.clearErrors("end_date")
      }
    }
  }, [startDate, endDate, form])

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
              onChange={(date) => {
                field.onChange(date)
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="end_date"
          render={({ field }) => (
            <CustomDateTimePicker
              {...field}
              minDate={startDate ? new Date(startDate) : new Date()} // Ensure it respects both date and time
              onChange={(date) => {
                field.onChange(date)
              }}
              variant="filled"
              label={t("bioBlocks.tabs.schedule.form.end_date")}
              error={
                formState.errors.end_date?.message &&
                t(`bioBlocks.tabs.schedule.form.errors.${formState.errors.end_date?.message}`)
              }
            />
          )}
        />
      </Group>
      <Button
        loading={formState.isSubmitting}
        type="submit"
        radius={"xl"}
        disabled={
          formState.isSubmitting ||
          Object.keys(formState.errors).length > 0 ||
          !startDate ||
          !endDate ||
          !validateDates(startDate, endDate)
        }>
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
