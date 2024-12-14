import { Table } from "@mantine/core"
import { useTranslation } from "react-i18next"

const BioPagesTableHead = () => {
  const { t } = useTranslation()

  return (
    <>
      <Table.Th>{t("bioPages.table.head.title")}</Table.Th>
      <Table.Th>{t("bioPages.table.head.path")}</Table.Th>
      <Table.Th>{t("bioPages.table.head.style")}</Table.Th>
      <Table.Th></Table.Th>
    </>
  )
}

export default BioPagesTableHead
