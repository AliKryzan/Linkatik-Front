import { useState } from "react"
import { Flex, Group, Stack, Tabs, Text, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import Error from "../../components/common/error"
import Loader from "../../components/common/loader"
import Plan from "../../components/plans/plan"
import { GetPlans } from "../../services/utils"

const Plans = () => {
  const { t } = useTranslation()
  const [type, setType] = useState("monthly_price")
  const { data, status } = useQuery({
    queryKey: ["plans"],
    queryFn: () => GetPlans(),
    refetchInterval: Infinity,
  })

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  if (status === "success" && !data.data) return <Error />

  return (
    <Stack w={"100%"} gap={"xl"} py={"xl"}>
      <div>
        <Title ta={"center"}>{t("plans.title")}</Title>
        <Text ta={"center"} mt={9}>
          {t("plans.description")}
        </Text>
      </div>
      <Flex justify="center">
        <Tabs value={type} onChange={setType}>
          <Tabs.List>
            <Tabs.Tab value="monthly_price">{t("plans.monthly_price")}</Tabs.Tab>
            <Tabs.Tab value="annual_price">{t("plans.annual_price")}</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Flex>
      <Group gap={"xl"} justify="center" align={"stretch"}>
        {data.data.data.map((plan) => (
          <Plan key={plan.id} plan={plan} type={type} />
        ))}
      </Group>
    </Stack>
  )
}

export default Plans
