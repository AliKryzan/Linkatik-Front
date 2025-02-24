import React, { Suspense, useEffect, useRef, useState } from "react"
import { groupAvatar } from "@/assets"
import {
  Box,
  Button,
  FileButton,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { Image as Image_, Plus, UsersIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import Loader from "@/components/common/loader"

import { useUploadFile } from "../../hooks/use-upload-file"
import MyDropzone from "../../hooks/use-upload-image"
import { setBioImage, setImage_type } from "../../store/General-variables/General-variables"
import CreateChooseAvatar from "./Create-chooce-avatar"

function CreateUploadImg({ setActiveAvatar, setModalOneOpen }) {
  const { bioImage, image_type } = useSelector((state) => state.GeneralSlice)

  const dispatch = useDispatch()

  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)
  const [img, setImg] = useState(bioImage)

  useEffect(() => {
    dispatch(setBioImage(img))
  }, [img])

  return (
    <>
      <Group
        gap="sm"
        align="center"
        position="center"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "5px",
        }}>
        <Stack
          onClick={open}
          align="center"
          justify="flex-end"
          gap="xs"
          style={{
            height: "200px",
            width: "200px",
            borderRadius: "16px",
            border: "1px solid #959595",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = "1px solid #8938b2"
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = "1px solid #959595"
            e.currentTarget.style.boxShadow = "none"
          }}>
          <UsersIcon color="#959595" size={100} strokeWidth={0.5} />
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#6E6E6E",
            }}
            fw={700}
            size="lg">
            {t("bioPages.createPage.ChooseFromPhotoLibrary")}
          </Text>
          <Text
            style={{
              color: "#6E6E6E",
            }}>
            {t("bioPages.createPage.FromOurLibrary")}
          </Text>
        </Stack>
        <Stack
          align="center"
          justify="flex-end"
          gap="xs"
          style={{
            height: "200px",
            width: "200px",
            borderRadius: "16px",
            border: "1px solid #959595",
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = "1px solid #8938b2"
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = "1px solid #959595"
            e.currentTarget.style.boxShadow = "none"
          }}>
          <MyDropzone setImg={setImg} setModalOneOpen={setModalOneOpen} />
          <Image_ color="#959595" size={100} strokeWidth={0.5} />
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#6E6E6E",
            }}
            fw={700}
            size="lg">
            {t("bioPages.createPage.UploadYourPhoto")}
          </Text>
          <Text
            style={{
              color: "#6E6E6E",
            }}>
            {t("bioPages.createPage.FromYourDevice")}
          </Text>
        </Stack>
      </Group>

      <Modal size="xl" centered opened={opened} onClose={close}>
        <Suspense fallback={<Loader />}>
          <CreateChooseAvatar
            setActiveAvatar={setActiveAvatar}
            close={() => setModalOneOpen(false)}
            setModalOneOpen={setModalOneOpen}
          />
        </Suspense>
      </Modal>
    </>
  )
}

export default CreateUploadImg
