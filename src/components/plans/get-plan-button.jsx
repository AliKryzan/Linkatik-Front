import { Button } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { useNavigate } from "../../lib/i18n/navigation"
import { PostTransaction, PostUpgradePlane } from "../../services/utils"
import { getLocalstorageUser } from "../../utils/get-localstorage-user"
import { updateUser } from "../../utils/update-user"

const GetPlanButton = ({ plan_id, plan_period }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mutationFn = () => {
    return getLocalstorageUser()?.plan?.id
      ? PostUpgradePlane({
          plan_id,
          plan_period,
        })
      : PostTransaction({
          plan_id,
          plan_period,
        })
  }

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: async ({ data }) => {
      if (data.data.pay_url) {
        window.location.href = data.data.pay_url
        return
      }

      await updateUser()

      navigate("/user")
    },
    onError: (error) => {
      console.log("🚀 ~ GetPlanButton ~ error:", error)
      toast.error(t("plans.errors.invalidResponse"))
    },
  })
  return (
    <Button loading={isPending} onClick={mutate} variant="outline" radius={"xl"} mt={"auto"}>
      {t("plans.getStarted")}
    </Button>
  )
}

export default GetPlanButton
