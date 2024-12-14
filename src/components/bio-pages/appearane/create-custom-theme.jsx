import { Button, Space, Stack } from "@mantine/core"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

import { queryClient } from "../../../lib/react-query/react-query-provider"
import { PutUpdateBioPage } from "../../../services/utils"
import { getScale } from "../../../utils/get-scale"
import { getShadow } from "../../../utils/get-shadow"
import Background from "./background"
import Buttons from "./buttons"
import Font from "./font"

const CreateCustomTheme = () => {
  const { id, path } = useParams()
  const form = useForm({
    defaultValues: {
      bio_page: {
        background_type: "preset",
        background_color: "#fafafa",
        background_image: "linear-gradient(0deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)",
        image: "",
      },
      bio_link: {
        variant: "filled",
        color: "#fcf3d8",
        radius: 100,
        size: 50,
        shadow: 50,
      },
    },
  })

  const { handleSubmit } = form

  const onSubmit = handleSubmit(async (data) => {
    const appearance = {
      bio_page: {
        background_type: data.bio_page.background_type,
        backgroundColor: data.bio_page.background_color,
        backgroundImage:
          data.bio_page.background_type === "image"
            ? data.bio_page.image
            : data.bio_page.background_type === "gradient"
              ? data.bio_page.background_image
              : "",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        font: data.font,
      },
      bio_link: {
        variant: data.bio_link.variant,
        color: data.bio_link.color,
        radius: getScale(data.bio_link.radius),
        size: getScale(data.bio_link.size),
        shadow: getShadow(data.bio_link.shadow),
      },
    }
    try {
      const response = await PutUpdateBioPage({
        id,
        data: { appearance },
      })
      console.log(response)
      await queryClient.setQueryData(["bio-page-theme-preview", path], response.data.data)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      toast.error(error.response?.data?.message || error.response?.message || error.message)
      form.setError("root", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })
    }
  })

  return (
    <Stack gap={"xl"} component="form" noValidate onSubmit={onSubmit}>
      <Background form={form} />
      <Buttons form={form} />
      <Font form={form} />
      <div>
        <Button loading={form.formState.isSubmitting} type="submit" variant="outline">
          حفظ المظهر
        </Button>
      </div>
      <Space />
    </Stack>
  )
}

export default CreateCustomTheme
