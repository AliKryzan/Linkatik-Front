import { Table } from "@mantine/core"
import { useTranslation } from "react-i18next"

const DomainsTableHead = () => {
  const { t } = useTranslation()

  return (
    <>
      <Table.Th>{t("domains.table.head.id")}</Table.Th>
      <Table.Th>{t("domains.table.head.domain")}</Table.Th>
      <Table.Th>{t("domains.table.head.createdAt")}</Table.Th>
      <Table.Th>{t("domains.table.head.status")}</Table.Th>
      <Table.Th></Table.Th>
    </>
  )
}

export default DomainsTableHead
