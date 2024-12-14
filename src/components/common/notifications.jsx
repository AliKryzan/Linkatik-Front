import { ActionIcon, Menu } from "@mantine/core"
import { Bell } from "lucide-react"

const Notifications = () => {
  return (
    <Menu width={220}>
      <Menu.Target>
        <ActionIcon variant="white" radius={"xl"} color="gray">
          <Bell size="1.3rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>Notifications</Menu.Dropdown>
    </Menu>
  )
}

export default Notifications
