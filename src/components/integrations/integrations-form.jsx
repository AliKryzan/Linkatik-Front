import { Button, Stack, Text } from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import { GetIntegrate, PostRemoveIntegrations } from "@/services/utils"
import { getLocalstorageUser } from "@/utils/get-localstorage-user"

const IntegrationsFrom = ({ type, is_connected }) => {
  const { t } = useTranslation()
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: GetIntegrate,
    onSuccess(response) {
      console.log("🚀 ~ onSuccess ~ response:", response)
      if (response?.data?.url) {
        window.location.href = response.data.url
      }
      if (response?.data?.redirect_url) {
        window.location.href = response.data.redirect_url
      }
    },
  })

  const queryClient = useQueryClient()
  const {
    mutate: removeIntegration,
    isPending: isRemovingIntegration,
    isError: isRemoveIntegrationError,
    error: removeIntegrationError,
  } = useMutation({
    mutationFn: PostRemoveIntegrations,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["integrations", getLocalstorageUser()?.token],
        exact: true,
      })
    },
  })
  return (
    <Stack p="xl" gap={"md"}>
      <Text>{t(`integrations.${type}.description`)}</Text>
      {!is_connected ? (
        <Button
          loading={isPending}
          onClick={() => {
            mutate({ type, url: "/ar/user/Integrations" })
          }}>
          {t("integrations.connect")}
        </Button>
      ) : (
        <Button
          loading={isRemovingIntegration}
          onClick={() => {
            removeIntegration({ type })
          }}
          variant="light"
          color="red">
          {t("integrations.disconnect")}
        </Button>
      )}
      {isError ? (
        <Text c={"red"} ta={"center"} fs={"sm"}>
          {error.response?.data?.message || error.message || "something went wrong!"}
        </Text>
      ) : null}
      {isRemoveIntegrationError ? (
        <Text c={"red"} ta={"center"} fs={"sm"}>
          {removeIntegrationError.response?.data?.message ||
            removeIntegrationError.message ||
            "something went wrong!"}
        </Text>
      ) : null}
    </Stack>
  )
}

export default IntegrationsFrom
