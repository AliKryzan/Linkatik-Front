import { Suspense } from "react"
import { Stack } from "@mantine/core"
// import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import CreateBioPageButton from "../../components/bio-pages/create-bio-page-button"
import GeneralStatistics from "../../components/bio-pages/general-statistics"
import ListBioPages from "../../components/bio-pages/list-bio-pages"
import Loader from "../../components/common/loader"
import TableHeader from "../../components/table/table-header"

const Dashboard = () => {
  const { t } = useTranslation()

  return (
    <Stack gap={"xl"} >
      <TableHeader  title={t("dashboard.title")}>
        <CreateBioPageButton />
      </TableHeader>
      <Suspense fallback={<Loader size="sm" />}>
        <GeneralStatistics />
        <ListBioPages />
      </Suspense>
    </Stack>
  )
}

export default Dashboard
