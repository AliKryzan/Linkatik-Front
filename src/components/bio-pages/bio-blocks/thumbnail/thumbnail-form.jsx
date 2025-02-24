import { useState } from "react"
import { Button, FileButton, Group, Image, LoadingOverlay, Stack, Text } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { imagePlaceholder } from "@/assets"
import { PutUpdateBlock } from "@/services/utils"
import { UploadFile } from "@/services/utils/upload"

const ThumbnailForm = ({ block }) => {
  const { id, path } = useParams()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const queryClient = useQueryClient()
  const queryFilter = { queryKey: ["bio-page", id, path] }
  const updateThumbnail = async (file) => {
    if (!file) return
    try {
      setError("")
      setIsLoading(true)
      const uploadResponse = await UploadFile({ file, collection_name: "image" })
      const response = await PutUpdateBlock({
        pageId: id,
        blockId: block.id,
        data: {
          type: block.type,
          image: uploadResponse.file_url,
        },
      })

      await queryClient.invalidateQueries(queryFilter)
      console.log("🚀 ~ updateThumbnail ~ response:", response)
    } catch (error) {
      setError(error?.response?.data?.message || error?.response?.message || error.message)
      console.log("🚀 ~ updateThumbnail ~ error:", error)
    } finally {
      setIsLoading(false)
    }
  }
  const deleteThumbnail = async () => {
    try {
      setError("")
      setIsLoading(true)
      const response = await PutUpdateBlock({
        pageId: id,
        blockId: block.id,
        data: {
          type: block.type,
          image: null,
        },
      })
      await queryClient.invalidateQueries(queryFilter)

      console.log("🚀 ~ updateThumbnail ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ updateThumbnail ~ error:", error)
      setError(error?.response?.data?.message || error?.response?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Group style={{ position: "relative" }} p={"lg"}>
      <LoadingOverlay visible={isLoading} overlayProps={{ radius: "sm", blur: 2 }} />

      <div>
        <Image w={120} h={120} radius={"50%"} fallbackSrc={imagePlaceholder} src={block.image} />
      </div>
      <Stack flex={1}>
        <FileButton onChange={updateThumbnail} accept="image/png,image/jpeg">
          {(props) => (
            <Button {...props} radius={"xl"}>
              {t("bioBlocks.tabs.thumbnail.form.updateButton")}
            </Button>
          )}
        </FileButton>
        {error && (
          <Text c={"red"} size="xs" ta={"center"}>
            {error}
          </Text>
        )}
        <Button onClick={deleteThumbnail} radius={"xl"} variant="outline">
          {t("bioBlocks.tabs.thumbnail.form.removeButton")}
        </Button>
      </Stack>
    </Group>
  )
}

export default ThumbnailForm
