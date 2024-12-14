export function objectToFormData(obj, formData = new FormData(), parentKey = null) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]

      if (typeof value === "undefined" && typeof value === "string" && !value) continue
      const formKey = parentKey ? `${parentKey}[${key}]` : key

      if (value instanceof Date) {
        formData.append(formKey, value.toISOString())
      } else if (value instanceof File) {
        formData.append(formKey, value)
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          objectToFormData({ [index]: item }, formData, formKey)
        })
      } else if (typeof value === "object" && value !== null) {
        objectToFormData(value, formData, formKey)
      } else {
        formData.append(formKey, value)
      }
    }
  }
  return formData
}
