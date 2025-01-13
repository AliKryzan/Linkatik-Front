import { useMemo, useState } from "react"
import { Group, Indicator, Select, Space, Stack, Text } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import dayjs from "dayjs"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { GetAvailableDates } from "../../../utils/get-avalibale-dates"

const BookingCalender = ({ product }) => {
  const { time_slots, next_days } = product
  const { t } = useTranslation()
  const form = useFormContext()

  // get available dates

  const dates = GetAvailableDates({
    next_days,
    availableDays: Object.keys(time_slots).map((day) => time_slots[day].day),
  })
  // handle selecting day
  const [selected, setSelected] = useState(null)
  const handleSelect = (date) => {
    const isSelected = dayjs(date).isSame(selected, "date")
    if (isSelected) {
      setSelected(null)
      return
    }
    setSelected(date)
  }

  const selectedDay = dayjs(selected).format("dddd").toLowerCase()
  const selectedTimeSlotId = useMemo(
    () =>
      Object.keys(time_slots).find((slot) => {
        return selectedDay ? selectedDay == time_slots[slot].day.toLowerCase() : null
      }),
    [selectedDay, time_slots],
  )
  const slots = useMemo(
    () =>
      selectedTimeSlotId
        ? Object.values(time_slots[selectedTimeSlotId].slots).map((slot) => ({
            label: `${slot.start_time} - ${slot.end_time}`,
            value: slot.id + "",
          }))
        : [],
    [selectedTimeSlotId, time_slots],
  )

  return (
    <Stack justify="center">
      <Text>{t("product-preview.form.calender-title")}</Text>
      <Group justify="center">
        <Controller
          control={form.control}
          name="date"
          render={({ field }) => (
            <div>
              <Calendar
                ref={field.ref}
                getDayProps={(date) => {
                  return {
                    disabled: dates[dayjs(date).format("YYYY-MM-DD")] === undefined,
                    selected: dayjs(date).isSame(selected),
                    onClick: () => {
                      field.onChange(dayjs(date).format("YYYY-MM-DD"))
                      handleSelect(date)
                    },
                  }
                }}
                renderDay={(date) => {
                  const day = date.getDate()
                  return (
                    <Indicator
                      size={6}
                      color="red"
                      offset={-2}
                      disabled={dates[dayjs(date).format("YYYY-MM-DD")] === undefined}>
                      <div>{day}</div>
                    </Indicator>
                  )
                }}
              />
              <Text size="sm" c={"red"}>
                {form.formState.errors.date?.message
                  ? t(`product-preview.form.errors.${form.formState.errors.date?.message}`)
                  : null}
              </Text>
            </div>
          )}
        />
      </Group>
      <Controller
        control={form.control}
        name="time_slot_id"
        render={({ field }) => (
          <Select
            label={t("product-preview.form.time_slot_id")}
            data={slots}
            error={
              form.formState.errors.time_slot_id?.message &&
              t(`product-preview.form.errors.${form.formState.errors.time_slot_id?.message}`)
            }
            {...field}
          />
        )}
      />
      <Space />
    </Stack>
  )
}

export default BookingCalender
