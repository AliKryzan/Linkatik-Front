import { useRef, useState } from "react"
import { useDebouncedCallback } from "@mantine/hooks"
import axios from "axios"

const useDebouncedMutation = ({ mutateFn, delay = 500, errorCallback }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const AbortControllerRef = useRef(null)
  const mutate = useDebouncedCallback(async (...args) => {
    AbortControllerRef.current?.abort()
    AbortControllerRef.current = new AbortController()
    try {
      setError(null)
      setLoading(true)
      await mutateFn({ ...args[0], abortSignal: AbortControllerRef.current?.signal })
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message) // Handle cancel error here
      } else {
        setError(error.response?.data?.message || error.response?.message || error?.message || "Error")
        errorCallback?.(error)
      }
    } finally {
      setLoading(false)
    }
  }, delay)

  return { mutate, loading, error }
}

export default useDebouncedMutation
