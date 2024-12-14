import { AppShell, Box, Burger, Button, Group } from "@mantine/core"
import { Flame } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Link } from "../../lib/i18n/navigation"
import Logo from "./logo"
import Notifications from "./notifications"
import UserButton from "./user-button"

const Header = ({ opened, toggle }) => {
  const { t } = useTranslation()
  return (
    <AppShell.Header withBorder={false}>
      <Group justify="space-between" h="100%" px="md" wrap="nowrap">
        <Group wrap="nowrap">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Box hiddenFrom="md">
            <Logo />
          </Box>
        </Group>
        <Group wrap="nowrap" align="center">
          <Button component={Link} to="/plans" variant="light" leftSection={<Flame />}>
            {t("header.upgrade")}
          </Button>
          <Notifications />
          <UserButton />
        </Group>
      </Group>
    </AppShell.Header>
  )
}

export default Header
