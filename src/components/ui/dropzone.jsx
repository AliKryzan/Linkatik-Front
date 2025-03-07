import "@mantine/dropzone/styles.css"

import { forwardRef } from "react"
import { Group, Text } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { ImageUp, Upload, X } from "lucide-react"
import { useTranslation } from "react-i18next"

const DropzoneComponent = forwardRef(function Component(
  { accept, maxSize = 5, onDrop, onReject, error, ...props },
  ref,
) {
  const { t } = useTranslation()

  return (
    <div>
      <Dropzone
        ref={ref}
        onDrop={onDrop}
        onReject={onReject}
        maxSize={maxSize * 1024 ** 2}
        accept={accept}
        {...props}>
        <Group justify="center" gap="lg" p={"md"} mih={180} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <Upload size={50} strokeWidth={1} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <X size={50} strokeWidth={1} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <ImageUp size={50} strokeWidth={1} />
          </Dropzone.Idle>

          <div>
            <Text size="lg" ta={"center"} inline>
              {t("fileUpload.title")}
            </Text>
            <Text ta={"center"} size="sm" c="dimmed" inline mt={11}>
              {t("fileUpload.description", { size: maxSize })}
            </Text>
          </div>
        </Group>
      </Dropzone>
      {error ? (
        <Text c={"red"} ta={"center"} size="xs" mt={11}>
          {error}
        </Text>
      ) : null}
    </div>
  )
})

export default DropzoneComponent
