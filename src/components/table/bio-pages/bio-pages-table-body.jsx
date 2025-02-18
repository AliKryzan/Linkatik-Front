import { ActionIcon, Badge, Group, Image, Menu, Table, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"

import { imagePlaceholder } from "../../../assets"
import useDeleteBioPageMutation from "../../../hooks/use-delete-bio-page-mutation"
import { Link } from "../../../lib/i18n/navigation"
import {groupAvatar} from '../../../assets'
import { number } from "prop-types"

const bioPageStyle = {
  buttons: {
    color: "blue",
    variant: "dot",
  },
  blocks: {
    color: "orange",
    variant: "dot",
  },
}

const BioPagesTableBody = ({ data, activePage }) => {
  const { mutate } = useDeleteBioPageMutation({ activePage })
  const { t } = useTranslation()
  const openDeleteModal = (pageId) =>
    modals.openConfirmModal({
      title: t("bioPages.deleteModal.title"),
      centered: true,
      children: <Text size="sm">{t("bioPages.deleteModal.description")}</Text>,
      labels: {
        confirm: t("bioPages.deleteModal.deleteButton"),
        cancel: t("bioPages.deleteModal.cancelButton"),
      },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        mutate({ id: pageId })
      },
    })



  const rows = data.map((element) => {
    return (
      <Table.Tr key={element.id} >
        <Table.Td>
          <Group  component={Link} to={"/user/bio-pages/" + element.id + "/" + element.path}>
            <div>
              <Image
                w={60}
                h={60}
                fit="cover"
                src={
                  element.image_avatar !== null
                    ? groupAvatar.find(avatar => Number(avatar.id) === Number(element.image_avatar) )?.image || element.image_path
                    : element.image_path
                }
                className={'!border border-[#707070] !rounded-full'}
                alt="linkatik"
                fallbackSrc={imagePlaceholder}
              />
            </div>
            {element.title}
          </Group>
        </Table.Td>
        <Table.Td>{element.path}</Table.Td>
        <Table.Td>
          <Badge {...bioPageStyle[element.style]}>{t(`bioPages.table.general.${element.style}`)}</Badge>
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
                state={{ product: element }}
                to={"/user/bio-pages/" + element.id + "/" + element.path}
                leftSection={<Pencil size={16} />}>
                {t("bioPages.updateButton")}
              </Menu.Item>

              <Menu.Item
                onClick={() => openDeleteModal(element.id)}
                color="red"
                leftSection={<Trash2 size={16} />}>
                {t("bioPages.deleteButton")}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    )
  })
  return rows
}

export default BioPagesTableBody
