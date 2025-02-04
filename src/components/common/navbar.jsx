import { Fragment } from "react"
import {
  AppShell,
  Button,
  Divider,
  Group,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import {
  Bell,
  Blocks,
  // Blocks,
  CreditCard,
  DollarSign,
  Home,
  Link,
  // QrCode,
  ShoppingCart,
  // UserCircle,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import { NavLink, usePathname } from "../../lib/i18n/navigation"
import Logo from "./logo"

const navItems = [
  [
    {
      label: "dashboard",
      link: "/user",
      icon: Home,
    },
    // {
    //   label: "bioPages",
    //   link: "/user/bio-pages",
    //   icon: UserCircle,
    // },
    // {
    //   label: "qrCodes",
    //   link: "/user/qr-codes",
    //   icon: QrCode,
    // },
    // {
    //   label: "profile",
    //   link: "/user/profile",
    //   icon: User,
    // },
    // {
    //   label: "payouts",
    //   link: "/user/payouts",
    //   icon: UserCircle,
    // },
    {
      label: "domain",
      link: "/user/domains",
      icon: Link,
    },
    // {
    //   label: "integrations",
    //   link: "/user/integrations",
    //   icon: Blocks,
    // },
  ],
  [
    {
      label: "products",
      link: "/user/products",
      icon: ShoppingCart,
    },
    {
      label: "paymentGateways",
      link: "/user/payment-gateways",
      icon: CreditCard,
    },
    {
      label: "integrations",
      link: "/user/Integrations",
      icon: Blocks,
    },
    {
      label: "orders",
      link: "/user/orders",
      icon: DollarSign,
    },
    {
      label: "subscriptions",
      link: "/user/subscriptions",
      icon: Bell,
    },
  ],
]
const Navbar = ({ toggle }) => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const { setColorScheme, colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const { height } = useViewportSize()

  return (
    <AppShell.Navbar
      bg={colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[8]}
      withBorder={false}
      className="navbar"
      p="lg">
      <Stack gap={"xl"} justify="space-between" flex={1} >
        <Stack gap={"xl"}>
          <AppShell.Section>
            <Group className="navbar-logo" justify="center">
              <Logo />
            </Group>
          </AppShell.Section>
          <ScrollArea h={height - 190}>
            <Stack gap={"md"} flex={1}>
              {navItems.map((item, index) => (
                <Fragment key={index}>
                  <AppShell.Section key={index}>
                    <Stack gap={"xs"}>
                      {item.map((item) => (
                        <Button
                          onClick={toggle}
                          size="sm"
                          justify="start"
                          variant={pathname === item.link ? "light" : "subtle"}
                          color={pathname === item.link ? "primary" : "gray"}
                          component={NavLink}
                          to={item.link}
                          key={item.label}>
                          <Group gap={"xs"} key={item.label} wrap="nowrap" justify="start">
                            <item.icon width={20} />
                            <Text fz={"sm"} key={item.label}>
                              {t(`general.${item.label}`)}
                            </Text>
                          </Group>
                        </Button>
                      ))}
                    </Stack>
                  </AppShell.Section>
                  {index !== navItems.length - 1 && <Divider />}
                </Fragment>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
        <Stack>
          <SegmentedControl
            size="xs"
            value={colorScheme}
            onChange={setColorScheme}
            data={[
              { label: t("general.darkMode"), value: "dark" },
              { label: t("general.lightMode"), value: "light" },
            ]}
          />
        </Stack>
      </Stack>
    </AppShell.Navbar>
  )
}

export default Navbar
