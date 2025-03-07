import { useEffect, useRef, useState } from "react"
import { groupAvatar, imagePlaceholder } from "@/assets"
import { PutUpdateBioPage } from "@/services/utils"
import { BioPageProfileSchema } from "@/validation/bio-page"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FileButton,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import Resizer from "react-image-file-resizer"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { useUploadFile } from "@/hooks/use-upload-file"
import CropImageModal from "@/components/common/crop-image-modal"

import CreateUploadImg from "../Create-upload-img"

const ProfileForm = ({ data }) => {
  const { bioImage, image_type, uploadedImage } = useSelector((state) => state.GeneralSlice)
  const [modalOneOpen, setModalOneOpen] = useState(false)
  const [activeAvatar, setActiveAvatar] = useState(0)
  const { id } = useParams()
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(BioPageProfileSchema),
  })
  const { handleSubmit, setError, watch, setValue, formState, control } = form

  const avatar = groupAvatar.find((item) => item.id === Number(data.image_avatar))

  const img_type = watch("image_type")
  const img = watch("image")

  console.log("img_type from last condole =====>", img_type)
  console.log("img from last condole =====>", img)

  const queryClient = useQueryClient()
  const onSubmit = handleSubmit(async (data) => {
    if (!data.image) {
      data = {
        ...data,
        image_path: null,
      }
    }
    try {
      await PutUpdateBioPage({
        id,
        data,
      })
      queryClient.invalidateQueries({ queryKey: ["bio-page-preview"] })
      queryClient.invalidateQueries({ queryKey: ["bio-page-info", id] })
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      toast.error(error.response?.data?.message || error.response?.message || error.message)
      setError("root", { message: error.response?.data?.message || error.response?.message || error.message })
    }
  })

  const { mutate, isPending } = useUploadFile({
    onSuccess: (data) => {
      setValue("image", data.file_url)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.response?.message || error.message)
      setError("image", {
        message: error.response?.data?.message || error.response?.message || error.message,
      })
    },
  })

  const handleRemoveImage = () => {
    setValue("image", null)
  }

  const [imageToCrop, setImageToCrop] = useState()
  const resetRef = useRef(null)
  function onImageSelected(image) {
    if (!image) return
    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "webp",
      100,
      0,
      (blob) => {
        setImageToCrop(blob)
      },
      "blob",
    )
  }
  useEffect(() => {
    form.setValue("image", image_type === "avatar" ? bioImage.image : bioImage)
    form.setValue("image_type", `${image_type}`)
  }, [bioImage, image_type, form])
  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])
  return (
    <>
      <Stack gap={"sm"}>
        <Text size={"xl"}>{t("bioPages.appearance.profile.title")}</Text>
        <Stack gap={"lg"} component={"form"} onSubmit={onSubmit} className="box">
          <Group style={{ position: "relative" }} p={"lg"}>
            <LoadingOverlay visible={isPending} overlayProps={{ radius: "sm", blur: 2 }} />

            <div>
              <Image
                w={120}
                h={120}
                radius={"50%"}
                fallbackSrc={imagePlaceholder}
                // src={image_type === "avatar" ? bioImage.image : watch("image")}
                src={watch('image')}
                className={"rounded-full !border border-[#707070]"}
                // className={data?.data.image_type === 'avatar' ? '!border border-[#707070] rounded-full':''}
              />
            </div>
            <Stack flex={1}>
              {/* <FileButton
                resetRef={resetRef}
                onChange={onImageSelected}
                accept="image/png,image/jpeg,image/svg">
                {(props) => (
                  <Button {...props} radius={"xl"}>
                    {t("bioPages.appearance.pickImageButton")}
                  </Button>
                )}
              </FileButton> */}
              <Button onClick={() => setModalOneOpen(true)} radius={"xl"}>
                {t("bioPages.appearance.pickImageButton")}
              </Button>
              <Modal
                size="xl"
                centered
                onClose={() => setModalOneOpen(false)}
                opened={modalOneOpen}
                withCloseButton>
                <CreateUploadImg setActiveAvatar={setActiveAvatar} setModalOneOpen={setModalOneOpen} />
              </Modal>
              {formState.errors.image?.message && (
                <Text c={"red"} size="xs" ta={"center"}>
                  {formState.errors.image?.message}
                </Text>
              )}
              <Button onClick={handleRemoveImage} radius={"xl"} variant="outline">
                {t("bioPages.appearance.removeImageButton")}
              </Button>
            </Stack>
          </Group>
          <Stack gap={"xs"}>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextInput
                  variant="filled"
                  label={t("bioPages.appearance.profile.titleInput")}
                  placeholder={t("bioPages.appearance.profile.titleInput")}
                  {...field}
                  error={
                    formState.errors.title?.message &&
                    t(`bioPages.appearance.errors.${formState.errors.title?.message}`)
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="bio"
              render={({ field }) => (
                <Textarea
                  variant="filled"
                  rows={5}
                  label={t("bioPages.appearance.profile.bioInput")}
                  placeholder={t("bioPages.appearance.profile.bioInput")}
                  {...field}
                  error={
                    formState.errors.bio?.message &&
                    t(`bioPages.appearance.errors.${formState.errors.bio?.message}`)
                  }
                />
              )}
            />
          </Stack>
          <Button type="submit" radius={"xl"} fullWidth disabled={isPending} loading={formState.isSubmitting}>
            {t("bioPages.appearance.profile.button")}
          </Button>
          {formState.errors.root?.message && (
            <Text c={"red"} size="xs" ta={"center"}>
              {formState.errors.root?.message}
            </Text>
          )}
          {imageToCrop && (
            <CropImageModal
              src={URL.createObjectURL(imageToCrop)}
              cropAspectRatio={1}
              onCropped={(blob) => {
                if (!blob) return
                mutate({
                  files: new File([blob], `bio_page_image${id}.webp`),
                  collection_name: "image",
                })
              }}
              onClose={() => {
                setImageToCrop(undefined)
                resetRef.current?.()
              }}
            />
          )}
        </Stack>
      </Stack>
    </>
  )
}

export default ProfileForm
