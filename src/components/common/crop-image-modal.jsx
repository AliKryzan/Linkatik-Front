import "cropperjs/dist/cropper.css"

import { useRef } from "react"
import { Button, Group, Modal } from "@mantine/core"
import { Cropper } from "react-cropper"
import { useTranslation } from "react-i18next"

export default function CropImageModal({ src, cropAspectRatio, onCropped, onClose }) {
  const { t } = useTranslation()
  const cropperRef = useRef(null)

  const crop = () => {
    const cropper = cropperRef.current?.cropper
    if (!cropper) return
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp")
    onClose()
  }

  return (
    <Modal
      opened
      onClose={() => {
        onClose()
      }}
      title={t("cropImageModal.title")}>
      <Cropper
        src={src}
        aspectRatio={cropAspectRatio}
        guides={false}
        zoomable={false}
        ref={cropperRef}
        className="mx-auto size-fit"
      />
      <Group mt="md" justify="end">
        <Button variant="outline" onClick={onClose}>
          {t("cropImageModal.cancel")}
        </Button>
        <Button onClick={crop}>{t("cropImageModal.crop")}</Button>
      </Group>
    </Modal>
  )
}
