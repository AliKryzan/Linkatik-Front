import { ActionIcon, Badge, Group, Menu, ScrollArea, Stack, Text, useMantineColorScheme } from "@mantine/core"
import { Bell } from "lucide-react"
import { useTranslation } from "react-i18next"

const Notifications = () => {
  // Mock data for demonstration
  const notifications = []
  const { colorScheme } = useMantineColorScheme()
  const unreadCount = notifications.filter((n) => !n.read).length
  const { t } = useTranslation()
  return (
    <Menu width={320} position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="white" radius="xl" color={colorScheme ==="light"?"gray": "dark"} pos="relative">
          <Bell size="1.3rem" />
          {unreadCount > 0 && (
            <Badge
              size="xs"
              variant="filled"
              pos="absolute"
              top={-2}
              right={-2}
              radius="xl"
              p={0}
              w={16}
              h={16}>
              {unreadCount}
            </Badge>
          )}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown p={0}>
        <Group justify="space-between" p="xs" bg={colorScheme ==="light"?"gray.0": "gray.9"}>
          <Text fw={500}>{t("Notifications")}</Text>
          {unreadCount > 0 && (
            <Badge size="xs" variant="light">
              {unreadCount} unread
            </Badge>
          )}
        </Group>

        <ScrollArea.Autosize mah={400} type="scroll">
          <Stack gap={0}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Menu.Item key={notification.id} py="xs" bg={notification.read ? undefined : "gray.0"}>
                  <Stack gap="xs">
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm" fw={500}>
                        {notification.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {notification.time}
                      </Text>
                    </Group>
                    <Text size="sm" c="dimmed">
                      {notification.message}
                    </Text>
                  </Stack>
                </Menu.Item>
              ))
            ) : (
              <Text c="dimmed" ta="center" py="xl">
                {t("No notifications")}
              </Text>
            )}
          </Stack>
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  )
}

export default Notifications
