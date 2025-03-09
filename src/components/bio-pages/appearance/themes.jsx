import { useState } from "react"
import Error from "../../common/error"
import Loader from "../../common/loader"
import { PutUpdateBioPage } from "@/services/utils"
import { Group, Radio, Stack, Text } from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import CreateCustomTheme from "./create-custom-theme"
import { ThemePreview } from "./theme-preview"
import { themes } from "@/constants"

const Themes = ({ data }) => {
  console.log("Themes data --------------------------------------------")
  console.log(data)
  const { bioImage, image_type } = useSelector((state) => state.GeneralSlice)

  const { t } = useTranslation()
  const [value, setValue] = useState(!!data?.is_custom_theme ? "custom" : data.bio_page_theme.id + "")
  const [img, setImg] = useState(data.image)

  // handle change theme
  const { path, id } = useParams()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async ({ value }) => {
      return await PutUpdateBioPage({
        id,
        // data: { bio_page_theme_id: value ,[data.image_type === 'custom' ? "image" : "image_avatar"]:image_type === 'custom' ? data.image : data.image_avatar,image_type:data.image_type},
        // data: { bio_page_theme_id: value ,image:data.image,image_type},
        data: { custom_theme_id: value, image: data.image, image_type: "custom" },
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["bio-page-theme-preview", path] })
    },
  })
  if (status === "pending") return <Loader />
  if (status === "error") return <Error />
  return (
    <>
      <Stack gap={"xl"}>
        <Text size="xl">{t("bioPages.appearance.themes.title")}</Text>
        <Radio.Group
          value={value}
          onChange={(value) => {
            setValue(value)
            mutate({ value: value })
          }}>
          <div className="xs:grid-cols-3 smd:grid-cols-3 3xl:grid-cols-6 grid grid-cols-2 gap-y-3 sm:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            <Stack>
              <Radio.Card className="theme-preview" radius="md" value={"custom"}>
                <Radio.Indicator className="indicator" />
                <Text ta={"center"}>{t("bioPages.appearance.themes.createYourTheme")}</Text>
              </Radio.Card>
              <Text ta={"center"} size="sm">
                {t("bioPages.appearance.themes.createYourTheme")}
              </Text>
            </Stack>
            {themes.map((theme, index) => (
              <ThemePreview key={index} theme={theme} />
            ))}
          </div>
        </Radio.Group>
      </Stack>
      {value === "custom" ? <CreateCustomTheme data={data} /> : null}
    </>
  )
}

export default Themes
