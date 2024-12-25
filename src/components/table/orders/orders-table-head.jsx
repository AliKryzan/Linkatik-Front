import { Table } from "@mantine/core"
import { useTranslation } from "react-i18next"

const OrdersTableHead = () => {
  const { t } = useTranslation()

  return (
    <>
      <Table.Th>{t("orders.table.head.id")}</Table.Th>
      <Table.Th>{t("orders.table.head.product")}</Table.Th>
      <Table.Th>{t("orders.table.head.email")}</Table.Th>
      <Table.Th>{t("orders.table.head.createdAt")}</Table.Th>
      <Table.Th>{t("orders.table.head.status")}</Table.Th>
      <Table.Th>{t("orders.table.head.revenue")}</Table.Th>
    </>
  )
}

export default OrdersTableHead
