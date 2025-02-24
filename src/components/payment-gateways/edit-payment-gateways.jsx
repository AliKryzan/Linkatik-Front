import { zodResolver } from "@hookform/resolvers/zod"
import { Box } from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { DeletePaymentGateWay, PutPaymentsGateWays } from "@/services/utils"
import { AddPaymentGatewaySchema } from "@/validation/payments-gateways"
import PaymentGatewayForm from "./form"

const EditPaymentGateWay = ({ defaultValues, id }) => {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(AddPaymentGatewaySchema),
    defaultValues,
  })
  const { handleSubmit, setError } = form

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await PutPaymentsGateWays(id, data)
      await queryClient.invalidateQueries({ queryKey: ["paymentGateways"] })
      close()
      console.log("🚀 ~ onSubmit ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: error.response?.data?.message || error.response?.message || error.message })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: () => DeletePaymentGateWay(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentGateways"] })
    },
  })
  return (
    <Box
      p="md"
      style={{
        borderRadius: "0 0 var(--mantine-radius-lg) var(--mantine-radius-lg)",
      }}>
      <PaymentGatewayForm deleteMutation={deleteMutation} edit form={form} onSubmit={onSubmit} />
    </Box>
  )
}

export default EditPaymentGateWay
