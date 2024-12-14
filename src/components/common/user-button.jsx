import { useEffect } from "react"
import { Avatar, Box, Group, Menu, Text, UnstyledButton } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { User } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useNavigate } from "../../lib/i18n/navigation"
import { GetUser } from "../../services/utils"
import { getLocalstorageUser } from "../../utils/get-localstorage-user"
import { removeUser } from "../../utils/logout"
import { updateUser } from "../../utils/update-user"

const UserButton = () => {
  const { t } = useTranslation()
  const { isSuccess, data } = useQuery({
    queryKey: ["user", getLocalstorageUser().token],
    queryFn: GetUser,
    initialData: getLocalstorageUser(),
    refetchInterval: Infinity,
  })
  useEffect(() => {
    if (isSuccess && data) {
      updateUser(data)
    }
  }, [isSuccess, data])

  const navigate = useNavigate()
  const handleLogout = () => {
    removeUser()
    navigate("/login")
  }

  return (
    <Menu width={220}>
      <Menu.Target>
        <UnstyledButton>
          <Avatar color="primary" radius="xl">
            <User size="1.5rem" />
          </Avatar>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Group gap="xs" px="sm" pb={"sm"}>
          <Avatar color="primary" radius="xl">
            <User size="1.5rem" />
          </Avatar>
          <Box>
            <Text>{data?.name}</Text>
            <Text fz="xs" c="gray">
              {data?.email}
            </Text>
          </Box>
        </Group>
        <Menu.Label>{t("header.account")}</Menu.Label>
        <Menu.Item onClick={() => navigate("/user/profile")}>{t("header.myAccount")}</Menu.Item>

        <Menu.Item onClick={() => navigate("/user/billing")}>{t("header.billing")}</Menu.Item>
        <Menu.Divider />
        <Menu.Label>{t("header.support")}</Menu.Label>
        <Menu.Item>{t("header.askAQuestion")}</Menu.Item>
        <Menu.Item>{t("header.helpTopics")}</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={handleLogout} color="red">
          {t("header.signOut")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserButton
