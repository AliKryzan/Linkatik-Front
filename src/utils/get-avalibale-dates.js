import dayjs from "dayjs"

export const GetAvailableDates = ({ next_days: duration, availableDays }) => {
  const availableDaysSet = new Set(availableDays.map((day) => day.toLowerCase()))
  const today = dayjs()
  const result = {}

  for (let i = 0; i < duration; i++) {
    const currentDay = today.add(i, "day")
    const dayName = currentDay.format("dddd").toLowerCase()

    if (availableDaysSet.has(dayName)) {
      const formattedDate = currentDay.format("YYYY-MM-DD")
      result[formattedDate] = true
    }
  }

  return result
}
