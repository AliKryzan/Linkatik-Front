export function generateTimeSlots(period) {
  // Validate input period
  if (![30, 45, 60].includes(+period)) {
    throw new Error("Period must be one of [30, 45, 60] minutes.")
  }

  const slots = []
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0) // Start at midnight
  const endOfDay = new Date(startOfDay)
  endOfDay.setHours(23, 59, 0, 0) // End at 11:59 PM

  let currentTime = new Date(startOfDay)

  // Function to format time as "HH:MM AM/PM"
  const formatTime = (time) => {
    const hours = time.getHours()
    const minutes = String(time.getMinutes()).padStart(2, "0")
    const suffix = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours === 0 ? 0 : hours % 12 || 12
    return `${formattedHours}:${minutes} ${suffix}`
  }

  // Generate slots until the end of the day
  while (currentTime <= endOfDay) {
    const start = new Date(currentTime)
    const end = new Date(currentTime)
    end.setMinutes(end.getMinutes() + +period)

    if (end > endOfDay) break // Stop if the end time exceeds the day

    // Format the time as "HH:MM AM/PM - HH:MM AM/PM"
    slots.push(`${formatTime(start)} - ${formatTime(end)}`)

    // Move to the next slot
    currentTime = end
  }

  return slots
}
