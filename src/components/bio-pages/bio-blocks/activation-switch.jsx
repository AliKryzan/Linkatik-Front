import { useState } from "react"
import { PutUpdateBlock } from "@/services/utils"
import { Switch } from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const ActivationSwitch = ({ block }) => {
  const { id, path } = useParams()
  const [isActive, setIsActive] = useState(!!block.is_active)

  const hasSchedule = block.schedule?.is_enable
  const startDate = hasSchedule ? new Date(block.schedule.start_date) : null
  const endDate = hasSchedule ? new Date(block.schedule.end_date) : null
  const currentDate = new Date()
  const isBlockActive = isActive && (!hasSchedule || (startDate <= currentDate && endDate >= currentDate));

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
      checked={isBlockActive}
      onChange={handleChange}
      // onLabel="ON"
      // offLabel="OFF"
    />
  )
}

export default ActivationSwitch
