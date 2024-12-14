import { Table } from "@mantine/core"
import { useTranslation } from "react-i18next"

const ProductsTableHead = () => {
  const { t } = useTranslation()

  return (
    <>
      <Table.Th>{t("products.table.head.product")}</Table.Th>
      <Table.Th>{t("products.table.head.price")}</Table.Th>
      <Table.Th>{t("products.table.head.max_price")}</Table.Th>
      <Table.Th>{t("products.table.head.sales")}</Table.Th>
      <Table.Th>{t("products.table.head.revenue")}</Table.Th>
      <Table.Th>{t("products.table.head.type")}</Table.Th>
      <Table.Th>{t("products.table.head.filter")}</Table.Th>
      <Table.Th></Table.Th>
    </>
  )
}

export default ProductsTableHead
