import { Stack } from "@mantine/core"
import { useTranslation } from "react-i18next"

import ListOrders from "../../../components/orders/list-orders"
import TableHeader from "../../../components/table/table-header"

const Orders = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={"xl"}>
      <TableHeader title={t("orders.title")} />
      <ListOrders />
    </Stack>
  )
}

export default Orders
