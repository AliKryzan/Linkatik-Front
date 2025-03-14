import { useEffect, useState } from "react"
import { PutUpdateBioPage } from "@/services/utils"
import { Button, Space, Stack } from "@mantine/core"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { queryClient } from "@/lib/react-query/react-query-provider"

import Background from "./background"
import Buttons from "./buttons"
import Font from "./font"

const CreateCustomTheme = ({ data }) => {
  console.log("Custom theme data +++++++++++++++++++++++++++++++++++++++++++")
  console.log(data)
  const [img, setImg] = useState(data.image)

  const { t } = useTranslation()
  const { id, path } = useParams()
  const form = useForm({
    defaultValues: {
      bio_page: {
        background_type: "preset",
        background_color: "#0F0F45CC",
        background_image: "linear-gradient(0deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)",
        image: "",
      },
      bio_link: {
        type: "",
        text_color: "",
        button_color: "",
      },
    },
  })

  const { handleSubmit } = form

  const onSubmit = handleSubmit(async (data) => {
    console.log("handleSubmit", data)
    const css = `
    .background{
       background: ${data.bio_page.background_color};
         background-image:
           ${
             data.bio_page.background_type === "image"
               ? data.bio_page.image
               : data.bio_page.background_type === "gradient"
                 ? data.bio_page.background_image
                 : ""
           };

         background-size: cover;
         background-position: center;
         background-repeat: no-repeat;
    }
    `
    const appearance = {
      bio_page: {
        html: '<div style="height:100%;" class="background"></div>',
        css,
        font: data.bio_page.font ?? "N/A",
      },
      bio_link: data.bio_link,
    }
    try {
      const response = await PutUpdateBioPage({
        id,
        // data: { appearance },
        data: { appearance, image: img, image_type: "custom", is_custom_theme: true },
        // data: { appearance,image:'ssssss',image_type:"custom"},
      })
      await queryClient.setQueryData(["bio-page-theme-preview", path], response.data.data)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      toast.error(error.response?.data?.message || error.response?.message || error.message)
      form.setError("root", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })
    }
  })
  useEffect(() => {
    if (data?.appearance?.bio_page) {
      // Extract background color and image from CSS string
      const cssString = data.appearance.bio_page.css
      const backgroundColorMatch = cssString?.match(/background:\s*(#[a-fA-F0-9]{6})/)
      const backgroundImageMatch = cssString?.match(/background-image:\s*(linear-gradient[^;]+)/)
      const backgroundImageUrlMatch = cssString?.match(
        /background-image:\s*((?:linear-gradient[^;]+|url\([^)]+\))[^;]*)/,
      )
      console.log("backgroundImageMatch 0000000000000000000000000000000000000000000000000")
      console.log(backgroundImageMatch, backgroundImageUrlMatch)
      const formData = {
        ...data.appearance,
        bio_page: {
          background_type: backgroundImageUrlMatch
            ? backgroundImageUrlMatch[1].startsWith("url")
              ? "image"
              : "gradient"
            : "preset",
          background_color: backgroundColorMatch ? backgroundColorMatch[1] : "#0F0F45CC",
          background_image: backgroundImageMatch
            ? backgroundImageMatch[1]
            : "linear-gradient(0deg, #CCC6F4 0%, #000F43 100%)",
          image:
            backgroundImageUrlMatch && backgroundImageUrlMatch[1].startsWith("url")
              ? backgroundImageUrlMatch[1]
              : "",
          font: data?.appearance.bio_page.font,
        },
      }

      form.reset(formData)
    }
  }, [data])
  return (
    <Stack gap={"xl"} className="!max-w-screen-lg" component="form" noValidate onSubmit={onSubmit}>
      <Background form={form} />
      <Buttons form={form} />
      <Font form={form} />
      <div>
        <Button loading={form.formState.isSubmitting} type="submit">
          {t("bioPages.appearance.themes.form.button")}
        </Button>
      </div>
      <Space />
    </Stack>
  )
}

export default CreateCustomTheme
