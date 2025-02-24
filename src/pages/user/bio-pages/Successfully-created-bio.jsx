import { Box, Flex, Text, Stack, Image, Button, Group } from '@mantine/core'
import { Download, Bell } from 'lucide-react'
import React from 'react'
import { groupAvatar } from '@/assets';
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { GetPageAppearance, GetPagePreview, GetSuccessfullyPreview } from "@/services/utils"
import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import { useTranslation } from 'react-i18next';


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
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          {/* Success Message Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              {t("general.linkatikReady")}
            </h1>
            <p className="text-gray-600 text-lg">
              {t("Time to share with the world")}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-500 border border-gray-100">
              https://app.linkatik.com/ar/preview/{data?.data?.path}
            </div>
          </div>

          {/* Preview Card */}
          <div className="w-[370px] bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-6 flex flex-col gap-6">
            {/* Top Actions */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow transition-all">
                <Bell size={18} className="text-purple-600" />
                <span className="text-sm font-medium">{t("general.Subscribe")}</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow transition-all">
                <Download size={18} className="text-purple-600" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse" />
                <div className="relative w-24 h-24 rounded-full border-2 border-purple-600 p-1 overflow-hidden">
                  <Image
                    src={image_type === 'custom' ? bioImage : bioImage.image}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {data?.data?.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-4">
                  {data?.data?.bio}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative flex items-center gap-3 mt-4 h-12">
              <button className="w-[160px] cursor-pointer h-10 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl text-sm font-medium hover:shadow-lg hover:shadow-purple-200 transition-all duration-300">
                {t("general.share")}
              </button>
              <a href={data?.data?.id ? `/ar/user/bio-pages/${data.data.id}/${path}` : "#"}>
                <button className="cursor-pointer w-[160px] h-10 bg-purple-100 text-purple-700 rounded-2xl text-sm font-medium hover:bg-purple-200 transition-all duration-300">
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
