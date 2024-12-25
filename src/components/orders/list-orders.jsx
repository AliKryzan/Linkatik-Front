import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Error from "../../components/common/error"
import Loader from "../../components/common/loader"
import { GetOrders } from "../../services/utils"
import { getLocalstorageUser } from "../../utils/get-localstorage-user"
import OrdersBody from "../table/orders/orders-table-body"
import OrdersTableHead from "../table/orders/orders-table-head"
import TableContainer from "../table/table-container"

const ListOrders = ({ searchValue }) => {
  const [page, setPage] = useState(1)

  const { data, status } = useQuery({
    queryKey: ["orders", searchValue, page, getLocalstorageUser()?.token],
    queryFn: async () => await GetOrders({ page, "filter[q]": searchValue }),
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
      head={<OrdersTableHead />}
      rows={<OrdersBody data={data.data} />}
    />
  )
}

export default ListOrders
