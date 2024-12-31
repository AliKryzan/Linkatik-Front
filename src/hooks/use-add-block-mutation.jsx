import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { PostCreateBlock } from "../services/utils"

export const useAddBlockMutation = () => {
  const { id: pageId, path } = useParams()
  const { t } = useTranslation

  const queryClient = useQueryClient()
  const queryKey = ["bio-page", pageId, path]

  const mutation = useMutation({
    mutationFn: async ({ data }) => await PostCreateBlock(pageId, data),

    onSuccess: async (blockResponse, { linkBehaviorOptions }) => {
      await queryClient.cancelQueries({ queryKey: queryKey })
      // we cancel any in-flight query
      queryClient.setQueryData(queryKey, (old) => {
        const firstPage = old?.pages[0]
        if (firstPage) {
          return {
            pageParams: old.pageParams,
            pages: [
              {
                data: [
                  ...firstPage.data,
                  { ...blockResponse.data, link_behavior: linkBehaviorOptions, is_active: 1 },
                ],
                pagination: firstPage.pagination,
              },
              ...old.pages.slice(1),
            ],
          }
        }

        // if there was NO first page we invalidate queries to fetch the first page
        // incase we canceled the query we need to fetch the first page
        queryClient.invalidateQueries({
          queryKey: queryKey,
        })
      })
      queryClient.invalidateQueries({
        queryKey: ["bio-page-preview", path],
      })
    },
    onError: (error) => {
      console.log("🚀 ~ useAddBlockMutation ~ error:", error)
      toast.error(t("bioBlocks.general.block_not_added"))
      queryClient.invalidateQueries({
        queryKey: queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: ["bio-page-preview", path],
      })
    },
  })
  return mutation
}
