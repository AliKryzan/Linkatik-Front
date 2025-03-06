import React, { useEffect, useRef, useState } from "react"
import { avatar, groupAvatar } from "@/assets"
import { PostCreateBioPage } from "@/services/utils"
import { BlankBioBaPageSchema } from "@/validation/bio-page"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Group, Image, Modal, Stack, Text, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Image as Image_, Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from "@/lib/i18n/navigation"

import CreateUploadImg from "./Create-upload-img"

const CreateBioPageForm = () => {
  const dispatch = useDispatch()
  const { bioImage, image_type, uploadedImage } = useSelector((state) => state.GeneralSlice)
  const [opened, { open, close }] = useDisclosure(false)
  const [activeAvatar, setActiveAvatar] = useState(0)

  const [modalOneOpen, setModalOneOpen] = useState(false)
  const [modalTwoOpen, setModalTwoOpen] = useState(false)
  const [modalThreeOpen, setModalThreeOpen] = useState(false)

  const closeAllModals = () => {
    setModalOneOpen(false)
    setModalTwoOpen(false)
    setModalThreeOpen(false)
  }

  const { t } = useTranslation()

  // console.log("ssssssssssss =======>",bioImage)
  // console.log("uploadedImage =======>",uploadedImage)

  const form = useForm({
    resolver: zodResolver(BlankBioBaPageSchema),
    defaultValues: {
      path: "",
      title: "",
      bio: "",
      style: "buttons",
      bio_page_theme_id: 1,
      image_type: `${image_type}`,
    },
  })

  const { control, handleSubmit, formState, setError } = form
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await PostCreateBioPage(
        data,
        image_type === "avatar" ? bioImage.id : uploadedImage,
        image_type,
      )
      navigate(`/user/bio-pages/${response.data.data.id}/${response.data.data.path}/Successfully`)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      setError("root", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })
    }
  })

  useEffect(() => {
    form.setValue("image", bioImage)
    form.setValue("image_type", `${image_type}`)
  }, [bioImage, image_type, form])

  useEffect(() => {
    console.log("isSubmitting:", formState.isSubmitting)
  }, [formState.isSubmitting])

  console.log("uploadedImage ==========>", uploadedImage)
  console.log("bioImage ==========>", bioImage)

  return (
    <Stack gap={"lg"} component={"form"} noValidate onSubmit={onSubmit}>
      <Group
        gap="sm"
        align="center"
        position="center"
        style={{
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}>
        <Box
          w={100}
          h={100}
          radius={"50%"}
          style={{
            border: "2px solid #8938b2", // الحد
            overflow: "hidden",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setModalOneOpen(true)}>
          <Plus />
        </Box>
        <Box
          w={100}
          h={100}
          radius={"50%"}
          style={{
            border: "2px solid #8938b2",
            overflow: "hidden",
            borderRadius: "50%",
          }}>
          <Image
            // src={bioImage}
            src={image_type === "avatar" ? bioImage.image : bioImage}
            alt="img"
          />
        </Box>
      </Group>
      <Stack>
        <Text size="xl" style={{ fontWeight: "bold", textAlign: "center" }}>
          {t("bioPages.addPersonalInfo")}
        </Text>
        <Text size="sm" style={{ fontWeight: "bold", textAlign: "center" }}>
          {t("bioPages.ChooicePersonalPhoto")}
        </Text>
      </Stack>

      {/* Path Input */}
      <Controller
        control={control}
        name="path"
        render={({ field }) => (
          <TextInput
            dir="ltr"
            styles={{
              input: { direction: "ltr", textAlign: "left" },
              wrapper: { direction: "ltr", textAlign: "left" },
            }}
            size="md"
            leftSectionWidth={130}
            leftSectionProps={{ bg: "gray" }}
            leftSection={
              <Box>
                <Text size="xs">{t("products.addProduct.slug_left")}</Text>
              </Box>
            }
            label={t("bioPages.createPage.pathInput.label")}
            error={
              formState.errors.path?.message &&
              t(`bioPages.createPage.errors.${formState.errors.path?.message}`)
            }
            {...field}
          />
          // <div className="flex items-center border rounded-md px-2 border-[#9a9a9a] relative " dir="ltr">
          //   <label className="absolute top-[-26px] right-0" htmlFor=""> {t("bioPages.createPage.pathInput.label")}</label>
          //   <span className="text-gray-500">https://linkatik.com/</span>
          //   <input
          //     {...field}
          //     className="flex-1 outline-none border-none px-2 p-[9px]"
          //   />
          // </div>
        )}
      />
      {/* Title Input */}
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput
            label={t("bioPages.createPage.title_1")}
            placeholder={t("bioPages.createPage.title_1")}
            error={
              formState.errors.title?.message &&
              t(`bioPages.createPage.errors.${formState.errors.title?.message}`)
            }
            {...field}
          />
        )}
      />
      {/* Description Input */}
      <Controller
        control={control}
        name="bio"
        render={({ field }) => (
          <TextInput
            label={t("bioPages.createPage.des")}
            placeholder={t("bioPages.createPage.des")}
            error={
              formState.errors.bio?.message &&
              t(`bioPages.createPage.errors.${formState.errors.bio?.message}`)
            }
            {...field}
          />
        )}
      />

      {/* Submit Button */}
      <Stack gap={"sm"}>
        <Button loading={formState.isSubmitting} type="submit">
          {t("bioPages.createPage.createButton")}
        </Button>
        {formState.errors.root?.message && (
          <Text c={"red"} size="xs" ta={"center"}>
            {formState.errors.root.message === "تم أخذ path بالفعل." ? t("bioPages.createPage.pathTaken") :formState.errors.root.message}
          </Text>
        )}
      </Stack>

      {/* <DevTool control={control} /> */}
      <Modal size="xl" centered onClose={() => setModalOneOpen(false)} opened={modalOneOpen} withCloseButton>
        <CreateUploadImg setActiveAvatar={setActiveAvatar} setModalOneOpen={setModalOneOpen} />
      </Modal>
    </Stack>
  )
}

export default CreateBioPageForm
