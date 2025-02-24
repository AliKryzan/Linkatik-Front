import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import { GetDomains } from "@/services/utils"
import { getLocalstorageUser } from "@/utils/get-localstorage-user"
import DomainsTableBody from "../table/domains/domains-table-body"
import DomainsTableHead from "../table/domains/table-head"
import TableContainer from "../table/table-container"

const ListDomains = () => {
  const [page, setPage] = useState(1)

  const { data, status } = useQuery({
    queryKey: ["domains", page, getLocalstorageUser()?.token],
    queryFn: async () => await GetDomains({ page }),
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
      head={<DomainsTableHead />}
      rows={<DomainsTableBody data={data.data} />}
    />
  )
}

export default ListDomains
