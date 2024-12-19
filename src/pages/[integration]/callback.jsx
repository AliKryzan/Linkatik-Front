import { useEffect } from "react"
import { Flex, Image, Loader, Stack, Text } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { sallaFullLogo, tiktokFullLogo, zidFullLogo } from "../../assets"
import Error from "../../components/common/error"
import { PostIntegrationCallback } from "../../services/utils"

const logos = {
  salla: sallaFullLogo,
  zid: zidFullLogo,
  tiktok: tiktokFullLogo,
}
const CallBack = () => {
  const { integration } = useParams()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: () => PostIntegrationCallback(integration, searchParams),
    onSuccess(data) {
      console.log("🚀 ~ onSuccess ~ data:", data)
      navigate("/user/integrations")
    },
  })

  useEffect(() => {
    mutate()
  }, [searchParams, mutate])
  return (
    <Flex align={"center"} justify="center" h="100vh">
      <Stack align="center">
        <Image h={70} src={logos[integration]} alt={integration} />
        <Text c={"gray"}>{t(`callback.title`)}</Text>
        {isPending ? <Loader type="dots" /> : null}
        {isError ? <Error error={error} /> : null}
      </Stack>
    </Flex>
  )
}

export default CallBack
