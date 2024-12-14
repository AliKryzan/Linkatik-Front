import { Table } from "@mantine/core"
import { useTranslation } from "react-i18next"

const SubscribersTableHead = () => {
  const { t } = useTranslation()

  return (
    <>
      <Table.Th>{t("subscribers.table.head.id")}</Table.Th>
      <Table.Th>{t("subscribers.table.head.email")}</Table.Th>
      <Table.Th>{t("subscribers.table.head.name")}</Table.Th>
      <Table.Th>{t("subscribers.table.head.bio_page")}</Table.Th>
      <Table.Th>{t("subscribers.table.head.createdAt")}</Table.Th>
      {/* <Table.Th>{t("subscribers.table.head.filter")}</Table.Th> */}
    </>
  )
}

export default SubscribersTableHead
