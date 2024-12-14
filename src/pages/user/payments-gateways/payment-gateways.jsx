import { useState } from "react"
import {
  Box,
  Button,
  Group,
  Image,
  Indicator,
  Pagination,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"

import { imagePlaceholder } from "../../../assets"
import AutoHeight from "../../../components/common/auto-height"
import Error from "../../../components/common/error"
import Loader from "../../../components/common/loader"
import AddPaymentGatewayButton from "../../../components/payment-gateways/add-payment-gateways"
import EditPaymentGateWay from "../../../components/payment-gateways/edit-payment-gateways"
import { PAYMENTGATEWAYS_LOGOS } from "../../../config"
import { GetPaymentsGateWays } from "../../../services/utils"
import { getLocalstorageUser } from "../../../utils/get-localstorage-user"

const PaymentGateways = () => {
  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [opened, setOpened] = useState(null)

  const { data, status } = useQuery({
    queryKey: ["paymentGateways", page, getLocalstorageUser()?.token],
    queryFn: async () => await GetPaymentsGateWays({ page }),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  })

  const { colorScheme } = useMantineColorScheme()
  console.log("🚀 ~ PaymentGateways ~ colorSchema:", colorScheme)

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />

  const totalPages = data.pagination?.last_page || undefined
  return (
    <Stack gap={"xl"}>
      <Group justify="space-between">
        <Title order={2}>{t("paymentGateways.title")}</Title>
        <AddPaymentGatewayButton />
      </Group>
      <Stack maw={500}>
        {data.data?.map((item, index) => {
          return (
            <Box bg={colorScheme === "dark" ? "dark" : "gray.1"} key={index}>
              <Indicator color={item.is_active ? "green" : "gray"} position="top-start" size={12}>
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
                        src={PAYMENTGATEWAYS_LOGOS[item.processor]}
                        fallbackSrc={imagePlaceholder}
                        alt={item.name}
                      />
                    </div>
                    {item.name}
                  </Group>
                </Button>
              </Indicator>
              <AutoHeight>
                {opened === index && <EditPaymentGateWay defaultValues={item} id={item.id} />}
              </AutoHeight>
            </Box>
          )
        })}
      </Stack>
      {totalPages > 1 && (
        <Box py={"lg"}>
          <Pagination onChange={setPage} value={page} total={totalPages} />
        </Box>
      )}
    </Stack>
  )
}

export default PaymentGateways
