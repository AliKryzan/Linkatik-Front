import { ActionIcon, Group, Stack, TextInput, useMantineTheme } from "@mantine/core"
import { IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { X } from "lucide-react"
import { Controller, useFieldArray } from "react-hook-form"

import { useUploadFile } from "../../../../../hooks/use-upload-file"
import DropzoneComponent from "../../../../ui/dropzone"

const ImageSlider = ({ form }) => {
  const theme = useMantineTheme()

  const { control } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "settings.images",
  })

  const { mutate: upload, isPending: isUploading } = useUploadFile({
    onSuccess(data) {
      if (Array.isArray(data)) {
        data.forEach((item) => append({ image_url: item.file_url, image_name: "" }))
        return
      }
      append({ image_url: data.file_url, image_name: "" })
    },
  })

  return (
    <>
      <Stack gap={"lg"}>
        <DropzoneComponent
          loading={isUploading}
          accept={IMAGE_MIME_TYPE}
          //   multiple
          onDrop={(files) => {
            console.log("🚀 ~ ImageSlider ~ files:", files)
            upload({
              files: files,
              collection_name: "image_slider",
            })
          }}
        />

        {fields.map((field, index) => (
          <Group
            key={field.id}
            wrap="nowrap"
            bg={theme.colors.primary[1]}
            style={{ borderRadius: theme.radius.md }}
            p={"sm"}
            gap={"xl"}
            align="center"
            justify="space-between">
            <img width={50} src={field.image_url} alt="" />

            <Controller
              control={control}
              name={`settings.images.${index}.image_name`}
              render={({ field }) => <TextInput variant="unstyled" w="100%" {...field} />}
            />
            <ActionIcon onClick={() => remove(index)} variant="transparent">
              <X strokeWidth={1.3} size={16} />
            </ActionIcon>
          </Group>
        ))}
      </Stack>
      {/* <DevTool control={control} /> */}
    </>
  )
}

export default ImageSlider
