import { useState } from "react"
import { Group, Radio, Stack, Text } from "@mantine/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { PutUpdateBioPage } from "../../../services/utils"
import Error from "../../common/error"
import Loader from "../../common/loader"
import CreateCustomTheme from "./create-custom-theme"
import { ThemePreview } from "./theme-preview"
import { useDispatch, useSelector } from "react-redux"

const Themes = ({ bioPageThemesQuery, data }) => {

  const { bioImage,image_type} = useSelector((state) => state.GeneralSlice)

  const { t } = useTranslation()
  const { status, data: themes } = bioPageThemesQuery
  const [value, setValue] = useState(data.bio_page_theme.id + "")
  const [img, setImg] = useState(data.image)

  // handle change theme
  const { path, id } = useParams()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async ({ value }) => {
      return await PutUpdateBioPage({
        id,
        // data: { bio_page_theme_id: value ,[data.image_type === 'custom' ? "image" : "image_avatar"]:image_type === 'custom' ? data.image : data.image_avatar,image_type:data.image_type},
        data: { bio_page_theme_id: value ,image:data.image,image_type},
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
      <Stack gap={"xl"} >
        <Text size="xl">{t("bioPages.appearance.themes.title")}</Text>
        <Radio.Group
          value={value}
          onChange={(value) => {
            setValue(value)
            mutate({ value: value })
          }}>
          <Group px={{ base: "md", md: "lg" }} gap={"lg"}>
            <Stack>
              <Radio.Card className="theme-preview" radius="md" value={"custom"}>
                <Radio.Indicator className="indicator" />
                <Text ta={"center"}>Create your Theme</Text>
              </Radio.Card>
              <Text ta={"center"} size="sm">
                Create your theme
              </Text>
            </Stack>
            {themes.data.map((theme) => (
              <ThemePreview key={theme.name} theme={theme} />
            ))}
          </Group>
        </Radio.Group>
      </Stack>
      {value === "custom" ? <CreateCustomTheme /> : null}
    </>
  )
}

export default Themes
