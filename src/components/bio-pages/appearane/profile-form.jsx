import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FileButton,
  Group,
  Image,
  LoadingOverlay,
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
import { useParams } from "react-router-dom"

import { imagePlaceholder } from "../../../assets"
import { useUploadFile } from "../../../hooks/use-upload-file"
import { PutUpdateBioPage } from "../../../services/utils"
import { BioPageProfileSchema } from "../../../validation/bio-page"
import CropImageModal from "../../common/crop-image-modal"

const ProfileForm = ({ data }) => {
  console.log("🚀 ~ ProfileForm ~ data:", data)
  const { id } = useParams()
  const { t } = useTranslation()
  const form = useForm({
    resolver: zodResolver(BioPageProfileSchema),
    defaultValues: {
      title: data.title,
      bio: data.bio,
      image: data.image_path,
    },
  })
  const { handleSubmit, setError, watch, setValue, formState, control } = form

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
      console.log("🚀 ~ ProfileForm ~ data:", data)
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

  return (
    <Stack gap={"sm"}>
      <Text size={"xl"}>{t("bioPages.appearance.profile.title")}</Text>
      <Stack gap={"lg"} component={"form"} onSubmit={onSubmit} className="box">
        <Group style={{ position: "relative" }} p={"lg"}>
          <LoadingOverlay visible={isPending} overlayProps={{ radius: "sm", blur: 2 }} />

          <div>
            <Image w={120} h={120} radius={"50%"} fallbackSrc={imagePlaceholder} src={watch("image")} />
          </div>
          <Stack flex={1}>
            <FileButton
              resetRef={resetRef}
              onChange={onImageSelected}
              accept="image/png,image/jpeg,image/svg">
              {(props) => (
                <Button {...props} radius={"xl"}>
                  {t("bioPages.appearance.pickImageButton")}
                </Button>
              )}
            </FileButton>
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
  )
}

export default ProfileForm
