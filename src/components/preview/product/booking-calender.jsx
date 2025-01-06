import { useState } from "react"
import { Select } from "@mantine/core"
import { Calendar } from "@mantine/dates"
import dayjs from "dayjs"

const BookingCalender = ({ product }) => {
  const { duration, timeSlots } = product
  // Calculate dates for the duration
  const today = dayjs()
  const [selectedDate, setSelectedDate] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])

  // Map weekdays to their corresponding dates
  const getDatesForWeekday = (weekday) => {
    const weekdayIndex = dayjs().day(weekday).day()
    return Array.from({ length: duration })
      .map((_, i) => today.add(i, "day"))
      .filter((date) => date.day() === weekdayIndex)
  }

  // Map slots to dates
  const mappedSlots = timeSlots.flatMap(({ day, slots }) => {
    const dates = getDatesForWeekday(day)
    return dates.map((date) => ({
      date: date.format("YYYY-MM-DD"),
      slots,
    }))
  })

  // Highlight days with slots
  const getDayStyles = (date) => {
    const dateString = dayjs(date).format("YYYY-MM-DD")
    return mappedSlots.some((slot) => slot.date === dateString)
      ? { backgroundColor: "#d3f8d3" } // Highlight color
      : {}
  }

  const handleDaySelect = (date) => {
    setSelectedDate(date)
    if (date) {
      const dateString = dayjs(date).format("YYYY-MM-DD")
      const slot = mappedSlots.find((s) => s.date === dateString)
      setAvailableSlots(slot?.slots || [])
    } else {
      setAvailableSlots([])
    }
  }

  return (
    <div>
      <Calendar value={selectedDate} onChange={handleDaySelect} dayStyle={getDayStyles} />
      {/* <Select
        label="Select a time slot"
        placeholder="Choose time"
        data={availableSlots.map((slot) => ({
          value: slot.id.toString(),
          label: `${slot.start_time} - ${slot.end_time}`,
        }))}
        disabled={availableSlots.length === 0}
      /> */}
    </div>
  )
}

export default BookingCalender
