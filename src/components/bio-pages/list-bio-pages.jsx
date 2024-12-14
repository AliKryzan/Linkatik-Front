import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Error from "../../components/common/error"
import Loader from "../../components/common/loader"
import { GetBioPagesList } from "../../services/utils"
import { getLocalstorageUser } from "../../utils/get-localstorage-user"
import BioPagesTableBody from "../table/bio-pages/bio-pages-table-body"
import BioPagesTableHead from "../table/bio-pages/table-head"
import TableContainer from "../table/table-container"

const ListBioPages = () => {
  const [page, setPage] = useState(1)

  const { data, status } = useQuery({
    queryKey: ["list-bio-pages", page, getLocalstorageUser()?.token],
    queryFn: () => GetBioPagesList({ page }),
    placeholderData: keepPreviousData,
  })

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />

  return (
    <TableContainer
      page={page}
      totalPages={data.pagination.last_page}
      setPage={setPage}
      minWidth={500}
      head={<BioPagesTableHead />}
      rows={<BioPagesTableBody data={data.data} activePage={data.pagination.current_page} />}
    />
  )
}

export default ListBioPages
