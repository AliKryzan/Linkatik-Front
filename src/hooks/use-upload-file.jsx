import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { UploadFile } from "../services/utils/upload"

export const useUploadFile = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (data) => {
      if (Array.isArray(data.files))
        return await Promise.all(
          data.files.map((file) => UploadFile({ file, collection_name: data.collection_name })),
        )
      return await UploadFile({ file: data.files, collection_name: data.collection_name || "image" })
    },
    onSuccess,
    onError: (error) => {
      console.log("🚀 ~ useUploadFile ~ error:", error)
      toast.error("File not uploaded")
      onError?.(error)
    },
  })
}
