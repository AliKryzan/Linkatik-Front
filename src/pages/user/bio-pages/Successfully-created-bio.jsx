import React from "react"
import { groupAvatar } from "@/assets"
import { GetPageAppearance, GetPagePreview, GetSuccessfullyPreview } from "@/services/utils"
import { Box, Button, Flex, Group, Image, Stack, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { Bell, Download } from "lucide-react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import ShareModal from "@/pages/preview/share-modal"

function SuccessfullyCreatedBio() {
  const { path } = useParams()
  const { id } = useParams()

  const { t } = useTranslation()
  const { data, status, isFetching } = useQuery({
    queryKey: ["bio-page-preview", path],
    queryFn: () => GetSuccessfullyPreview(id),
  })

  const { bioImage, image_type } = useSelector((state) => state.GeneralSlice)

  console.log("bioImage from successfully ====>", bioImage)
  console.log("image_type from successfully ====>", image_type)

  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  if (status === "success" && !data.data) return <Error />

  return (
    <>
      <div className="flex items-center justify-center px-4">
        <div className="flex w-full max-w-md flex-col items-center gap-8">
          {/* Success Message Section */}
          <div className="!space-y-4 text-center">
            <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              {t("general.linkatikReady")}
            </h1>
            <p className="text-lg text-gray-600">{t("Time to share with the world")}</p>
            <div
              className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-500"
              dir="ltr">
              <span className="truncate">https://app.linkatik.com/ar/preview/{data?.data?.path}</span>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(`https://app.linkatik.com/ar/preview/${data?.data?.path}`)
                    .then(() => {
                      toast.success(t("general.copied"), {
                        position: "top-center",
                      })
                    })
                }}
                className="shrink-0 rounded-md p-1.5 text-purple-600 transition-colors hover:bg-purple-50"
                title={t("general.copy")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="flex w-[370px] flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg shadow-purple-100/50">
            {/* Top Actions */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm transition-all hover:shadow">
                <Bell size={18} className="text-purple-600" />
                <span className="text-sm font-medium">{t("general.Subscribe")}</span>
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:shadow">
                <Download size={18} className="text-purple-600" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-purple-500 to-purple-600 opacity-20 blur-lg" />
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-purple-600 p-1">
                  <Image
                    src={image_type === "custom" ? bioImage : bioImage.image}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{data?.data?.title}</h2>
                <p className="line-clamp-4 text-sm text-gray-600">{data?.data?.bio}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative mt-4 flex h-12 items-center gap-3">
              <ShareModal data={data}>
                <button className="h-10 w-[160px] cursor-pointer rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-200">
                  {t("general.share")}
                </button>
              </ShareModal>
              <a href={data?.data?.id ? `/ar/user/bio-pages/${data.data.id}/${path}` : "#"}>
                <button className="h-10 w-[160px] cursor-pointer rounded-2xl bg-purple-100 text-sm font-medium text-purple-700 transition-all duration-300 hover:bg-purple-200">
                  {t("general.continueEditing")}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessfullyCreatedBio
