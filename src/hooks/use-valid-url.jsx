import { useMutation } from "@tanstack/react-query"

import { GetLinkDetections } from "../services/utils"

const useValidURL = ({ type, onError, onSuccess }) => {
  const mutateFunction = async ({ url }) => {
    if (!url) throw new Error("من فضلك قم بادخال رابط")
    const response = await GetLinkDetections({ url: url })
    console.log("🚀 ~ mutateFunction ~ response:", response)
    if (type === "link" ? response.type : response.type !== type) throw new Error("invalidUrl")
    return response
  }
  const mutation = useMutation({
    mutationFn: mutateFunction,
    onError,
    onSuccess(data) {
      onSuccess(data)
    },
  })

  const checkURL = (url) => {
    if (!url) return null
    mutation.mutate({ url })
  }

  return {
    ...mutation,
    checkURL,
  }
}

export default useValidURL
