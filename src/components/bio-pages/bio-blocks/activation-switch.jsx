import { useState } from "react"
import { Switch } from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { PutUpdateBlock } from "@/services/utils"

const ActivationSwitch = ({ block }) => {
  const { id, path } = useParams()
  const [isActive, setIsActive] = useState(!!block.is_active)

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: PutUpdateBlock,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bio-page-preview", path] })
    },
    onError: (error) => {
      console.log("🚀 ~ ActivationSwitch ~ error:", error)
      setIsActive((pre) => !pre)
    },
  })
  const handleChange = (e) => {
    setIsActive(e.target.checked)
    mutate({
      pageId: id,
      blockId: block.id,
      data: {
        type: block.type,
        is_active: e.target.checked ? 1 : 0,
      },
    })
  }

  return (
    <Switch
      color="green.6"
      size="md"
      checked={isActive}
      onChange={handleChange}
      // onLabel="ON"
      // offLabel="OFF"
    />
  )
}

export default ActivationSwitch
