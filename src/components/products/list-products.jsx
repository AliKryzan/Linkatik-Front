import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import { GetProducts } from "@/services/utils"
import { getLocalstorageUser } from "@/utils/get-localstorage-user"
import ProductsTableBody from "../table/products/products-tabel-body"
import ProductsTableHead from "../table/products/products-table-head"
import TableContainer from "../table/table-container"

const ListProducts = ({ searchValue }) => {
  const [page, setPage] = useState(1)
  const { data, status } = useQuery({
    queryKey: ["products", page, searchValue, getLocalstorageUser()?.token],
    queryFn: async () => await GetProducts({ page, "filter[q]": searchValue }),
    placeholderData: keepPreviousData,
  })

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />

  return (
    <TableContainer
      page={page}
      totalPages={data.pagination.last_page}
      setPage={setPage}
      minWidth={800}
      head={<ProductsTableHead />}
      rows={<ProductsTableBody data={data.data} />}
    />
  )
}

export default ListProducts
