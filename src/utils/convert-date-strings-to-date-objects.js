import { z } from "zod"

export function convertDateStringsToDateObjects(obj) {
  // Loop through the object's properties
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]

      // Check if the value is a string that can be parsed as a date
      if (
        (typeof value === "string" && z.string().date().safeParse(value).success) ||
        z.string().datetime().safeParse(value).success
      ) {
        // Convert the string to a Date object
        obj[key] = new Date(value)
      }

      // If the value is an object (and not null), recurse into it
      if (typeof value === "object" && value !== null) {
        convertDateStringsToDateObjects(value) // recursive call for nested objects
      }
    }
  }
  return obj
}
