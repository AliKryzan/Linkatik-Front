import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { DeleteBioPage } from "../services/utils"
import { getLocalstorageUser } from "../utils/get-localstorage-user"

const useDeleteBioPageMutation = ({ activePage }) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const queryFilter = {
    queryKey: ["list-bio-pages", activePage, getLocalstorageUser()?.token],
  }

  const mutation = useMutation({
    mutationFn: DeleteBioPage,
    onMutate: ({ id }) => {
      // here we mutate the cash directly for optimistic update
      queryClient.setQueryData(queryFilter.queryKey, (oldData) => {
        if (!oldData) return
        return {
          pagination: oldData.pagination,
          data: oldData.data.filter((page) => {
            return page.id !== id
          }),
        }
      })
    },
    async onSuccess() {
      toast.success(t("bioPages.page_deleted_successfully"))
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error)
      toast.error(t("bioPages.page_not_deleted"))
      queryClient.invalidateQueries(queryFilter)
    },
  })

  return mutation
}

export default useDeleteBioPageMutation
