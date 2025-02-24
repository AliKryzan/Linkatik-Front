import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import { GetSubscribers } from "@/services/utils"
import { getLocalstorageUser } from "@/utils/get-localstorage-user"
import SubscribersBody from "../table/subscribers/subscribers-table-body"
import SubscribersTableHead from "../table/subscribers/subscribers-table-head"
import TableContainer from "../table/table-container"

const ListSubscribers = ({ searchValue }) => {
  const [page, setPage] = useState(1)

  const { data, status } = useQuery({
    queryKey: ["subscribers", searchValue, page, getLocalstorageUser()?.token],
    queryFn: async () => await GetSubscribers({ page, "filer[q]": searchValue }),
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
      head={<SubscribersTableHead />}
      rows={<SubscribersBody data={data.data} />}
    />
  )
}

export default ListSubscribers
