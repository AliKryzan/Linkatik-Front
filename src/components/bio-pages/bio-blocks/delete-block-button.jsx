import { ActionIcon, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import useDeleteBioBlockMutation from "@/hooks/ues-delete-bio-block-mutation"

const DeleteBioBlockButton = ({ blockId }) => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { mutate } = useDeleteBioBlockMutation()
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: t("bioBlocks.deleteModal.title"),
      centered: true,
      children: <Text size="sm">{t("bioBlocks.deleteModal.description")}</Text>,
      labels: {
        confirm: t("bioBlocks.deleteModal.deleteButton"),
        cancel: t("bioBlocks.deleteModal.cancelButton"),
      },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        mutate({ pageId: id, blockId })
      },
    })
  return (
    <ActionIcon onClick={openDeleteModal} variant="transparent" aria-label="delete">
      <Trash2 strokeWidth={1.2} size={20} color="red" />
    </ActionIcon>
  )
}

export default DeleteBioBlockButton
