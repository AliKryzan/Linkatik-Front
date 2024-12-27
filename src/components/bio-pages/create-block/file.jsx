import { ActionIcon, Group, Text, useMantineTheme } from "@mantine/core"
import { IMAGE_MIME_TYPE, MIME_TYPES, PDF_MIME_TYPE } from "@mantine/dropzone"
import { X } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { useSelector } from "react-redux"

import { useUploadFile } from "../../../hooks/use-upload-file"
import DropzoneComponent from "../../ui/dropzone"

const FileBlock = () => {
  const theme = useMantineTheme()
  const { name } = useSelector((state) => state.bioBlock.block)

  const { setValue, watch } = useFormContext()
  const handleRemove = () => {
    setValue("settings.file_url", "")
    setValue("settings.file_name", "")
  }

  const { mutate: upload, isPending: isUploading } = useUploadFile({
    onSuccess(data, { files }) {
      setValue("settings.file_url", data.file_url)
      setValue("settings.file_name", files?.name || "unknown")
    },
  })

  const types = {
    image: IMAGE_MIME_TYPE,
    file: PDF_MIME_TYPE,
    audio: ["audio/mpeg", "audio/mp3"],
    video: [MIME_TYPES.mp4],
  }
  const accept = types[name]

  return (
    <>
      <DropzoneComponent
        loading={isUploading}
        accept={accept}
        multiple={false}
        onDrop={(files) => {
          upload({
            files: files[0],
            collection_name: name,
          })
        }}
      />

      {watch("settings.file_url") ? (
        <Group
          wrap="nowrap"
          bg={theme.colors.primary[1]}
          style={{ borderRadius: theme.radius.md }}
          p={"sm"}
          gap={"xl"}
          align="center"
          justify="space-between">
          <div>
            <Text className="truncate">{watch("settings.file_url")}</Text>
            <Text className="truncate" size="sm">
              {watch("settings.file_name")}
            </Text>
          </div>
          <ActionIcon onClick={handleRemove} variant="transparent">
            <X strokeWidth={1.3} size={16} />
          </ActionIcon>
        </Group>
      ) : null}
    </>
  )
}

export default FileBlock
