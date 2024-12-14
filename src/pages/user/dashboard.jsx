// import { useState } from "react"
import { Stack } from "@mantine/core"
// import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import CreateBioPageButton from "../../components/bio-pages/create-bio-page-button"
import ListBioPages from "../../components/bio-pages/list-bio-pages"
import TableHeader from "../../components/table/table-header"

const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={"xl"}>
      <TableHeader title={t("dashboard.title")}>
        <CreateBioPageButton />
      </TableHeader>
      <ListBioPages />
    </Stack>
  )
}

export default Dashboard
