import { useState } from "react"
import { Box, Button, Group, Image, Indicator, Stack, Title, useMantineColorScheme } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"

import { imagePlaceholder } from "../../../assets"
import AutoHeight from "../../../components/common/auto-height"
import Error from "../../../components/common/error"
import Loader from "../../../components/common/loader"
import IntegrationsFrom from "../../../components/integrations/integrations-form"
import { INTEGRATIONS } from "../../../config"
import { GetIntegrations } from "../../../services/utils"
import { getLocalstorageUser } from "../../../utils/get-localstorage-user"

const Integrations = () => {
  const { t } = useTranslation()

  const [opened, setOpened] = useState(null)

  const { data, status } = useQuery({
    queryKey: ["integrations", getLocalstorageUser()?.token],
    queryFn: GetIntegrations,
  })

  const { colorScheme } = useMantineColorScheme()

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  return (
    <Stack gap={"xl"}>
      <Group justify="space-between">
        <Title order={2}>{t("integrations.title")}</Title>
      </Group>
      <Stack maw={500}>
        {data.data?.map((item, index) => {
          return (
            <Box bg={colorScheme === "dark" ? "dark" : "gray.1"} key={item.type}>
              <Indicator color={item.is_connected ? "green" : "gray"} position="top-start" size={12}>
                <Button
                  onClick={() => {
                    setOpened(opened === index ? null : index)
                  }}
                  rightSection={<ChevronDown strokeWidth={1.3} />}
                  justify="space-between"
                  variant={"light"}
                  size="lg"
                  color={"gray"}
                  fullWidth>
                  <Group>
                    <div>
                      <Image
                        w={32}
                        h={32}
                        src={INTEGRATIONS[item.type].icon}
                        fallbackSrc={imagePlaceholder}
                        alt={item.type}
                      />
                    </div>
                    {t(`integrations.${item.type}.label`)}
                  </Group>
                </Button>
              </Indicator>
              <AutoHeight>{opened === index && <IntegrationsFrom {...item} />}</AutoHeight>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Integrations
