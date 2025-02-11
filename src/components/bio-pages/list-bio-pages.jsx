import { useState } from "react"
import { Stack, Text } from "@mantine/core"
import { keepPreviousData, useSuspenseQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import { GetBioPagesList } from "../../services/utils"
import { getLocalstorageUser } from "../../utils/get-localstorage-user"
import BioPagesTableBody from "../table/bio-pages/bio-pages-table-body"
import BioPagesTableHead from "../table/bio-pages/table-head"
import TableContainer from "../table/table-container"

const ListBioPages = () => {
  const [page, setPage] = useState(1)

  const { data } = useSuspenseQuery({
    queryKey: ["list-bio-pages", page, getLocalstorageUser()?.token],
    queryFn: () => GetBioPagesList({ page }),
    placeholderData: keepPreviousData,
  })

  const { t } = useTranslation()
  return (
    <Stack  gap={"xs"}>
      <Text className="chart-title">
        <span></span>
        {t(`bioPages.title`)}
      </Text>
      <TableContainer
        page={page}
        totalPages={data.pagination.last_page}
        setPage={setPage}
        minWidth={500}
        head={<BioPagesTableHead />}
        rows={<BioPagesTableBody data={data.data} activePage={data.pagination.current_page} />}
      />
    </Stack>
  )
}

export default ListBioPages
