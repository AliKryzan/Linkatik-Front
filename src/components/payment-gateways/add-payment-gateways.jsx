import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { PostPaymentsGateWays } from "../../services/utils"
import { AddPaymentGatewaySchema } from "../../validation/payments-gateways"
import PaymentGatewayForm from "./form"

const Form = ({ close }) => {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(AddPaymentGatewaySchema),
    defaultValues: {
      name: "",
      processor: "paypal",
      is_active: true,
      settings: {
        mode: "live",
        client_id: "",
        secret: "",
      },
    },
  })
  const { handleSubmit, setError } = form

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await PostPaymentsGateWays(data)
      await queryClient.invalidateQueries({ queryKey: ["paymentGateways"] })
      close()
      console.log("🚀 ~ onSubmit ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", { message: error.response?.data?.message || error.response?.message || error.message })
    }
  })
  return <PaymentGatewayForm form={form} onSubmit={onSubmit} />
}
const AddPaymentGatewayButton = () => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button onClick={open}>{t("paymentGateways.addButton")}</Button>
      <Modal centered opened={opened} onClose={close} title={t("paymentGateways.addButton")}>
        <Form close={close} />
      </Modal>
    </>
  )
}

export default AddPaymentGatewayButton
