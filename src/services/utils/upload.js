import { AuthLinkatikApi } from ".."
import { objectToFormData } from "@/utils/obj-to-formdata"

export const UploadFile = async (data) => {
  const response = await AuthLinkatikApi.post("/user/upload", objectToFormData(data))
  return response.data.data
}
