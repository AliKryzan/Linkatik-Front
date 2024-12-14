export function convertTo24HourFormat(time12h) {
  console.log("🚀 ~ convertTo24HourFormat ~ time12h:", time12h)
  const [time, modifier] = time12h.split(" ")

  let [hours, minutes] = time.split(":")
  hours = parseInt(hours, 10)

  if (modifier === "PM" && hours !== 12) {
    hours += 12
  } else if (modifier === "AM" && hours === 12) {
    hours = 0
  }

  const hoursStr = hours.toString().padStart(2, "0")
  return `${hoursStr}:${minutes}:00`
}
