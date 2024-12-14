import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { DeleteBioBlock } from "../services/utils"

const useDeleteBioBlockMutation = () => {
  const { t } = useTranslation()
  const { id, path } = useParams()

  if (!id || !path) throw new Error("id or path not found")
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: DeleteBioBlock,
    async onSuccess(data, { blockId }) {
      const queryFilter = {
        queryKey: ["bio-page", id, path],
      }
      // here we cancel any ongoing queries to prevent bugs with infinite scroll
      await queryClient.cancelQueries(queryFilter)
      // here we mutate the cash directly for better performance
      queryClient.setQueryData(queryFilter.queryKey, (oldData) => {
        if (!oldData) return
        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => {
            return {
              data: page.data.filter((block) => block.id !== blockId),
              pagination: page.pagination,
            }
          }),
        }
      })
      queryClient.invalidateQueries({
        queryKey: ["bio-page-preview", path],
      })

      toast.success(t("bioBlocks.general.bio_block_deleted_successfully"))
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error)
      toast.error(t("bioBlocks.general.bio_block_deleted_error"))
    },
  })

  return mutation
}

export default useDeleteBioBlockMutation
