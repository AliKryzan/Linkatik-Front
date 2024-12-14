import { ActionIcon, Badge, Menu, Table, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { useQueryClient } from "@tanstack/react-query"
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { Link } from "../../../lib/i18n/navigation"
import { DeleteDomain } from "../../../services/utils"

const DomainsTableBody = ({ data }) => {
  const { t } = useTranslation()

  const queryClient = useQueryClient()
  const queryKey = {
    queryKey: ["domains"],
  }
  const rows = data.map((element) => {
    const openDeleteModal = () =>
      modals.openConfirmModal({
        title: t("domains.deleteDomainModal.title"),
        centered: true,
        children: (
          <Text size="sm">{t("domains.deleteDomainModal.description", { domain: element.domain })}</Text>
        ),
        labels: {
          confirm: t("domains.deleteDomainModal.deleteButton"),
          cancel: t("domains.deleteDomainModal.cancelDeleteButton"),
        },
        confirmProps: { color: "red" },
        onCancel: () => console.log("Cancel"),
        onConfirm: async () => {
          try {
            await queryClient.setQueriesData(queryKey, (old) => {
              if (!old) return
              return { data: old.data.filter((item) => item.id !== element.id), pagination: old.pagination }
            })
            await DeleteDomain(element.id)
            await queryClient.invalidateQueries(queryKey)
            toast.success(t("domains.deleteDomainModal.successMessage"))
          } catch (error) {
            console.log("🚀 ~ onConfirm:async ~ error:", error)
            toast.success(t("domains.deleteDomainModal.errorMessage"))
          }
        },
      })
    return (
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.domain}</Table.Td>
        <Table.Td>{element.created_at}</Table.Td>
        <Table.Td>
          <Badge variant="dot" color={element.status ? "green" : "red"} size="lg" fw={"400"} radius="sm">
            {t(`domains.status.${element.status ? "active" : "inactive"}`)}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md">
            <Menu.Target>
              <ActionIcon radius={"sm"} variant="transparent">
                <EllipsisVertical strokeWidth={1} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                state={{ domain: element }}
                to={"/user/domains/" + element.id}
                leftSection={<Pencil size={16} />}>
                {t("domains.updateDomain")}
              </Menu.Item>

              <Menu.Item onClick={openDeleteModal} color="red" leftSection={<Trash2 size={16} />}>
                {t("domains.deleteDomain")}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    )
  })
  return rows
}

export default DomainsTableBody
