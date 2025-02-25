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
  MoonIcon,
  // QrCode,
  ShoppingCart,
  SunIcon,
  // UserCircle,
} from "lucide-react"
import { useTranslation } from "react-i18next"

// Add this import at the top with other imports
import { NavLink, useChangeLocale, useCurrentLocale, usePathname } from "@/lib/i18n/navigation"

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
  // Add these hooks with other hooks
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()

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
      <Stack gap={"xl"} justify="space-between" flex={1}>
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
        <div className="-mt-10 flex items-center gap-3 [@media(min-width:993px)]:flex-col">
          <SegmentedControl
            size="xs"
            value={locale}
            onChange={(value) => changeLocale(value)}
            data={[
              {
                label: <div className="flex items-center justify-center px-2 py-1.5">EN</div>,
                value: "en",
              },
              {
                label: <div className="flex items-center justify-center px-2 py-1.5">عربي</div>,
                value: "ar",
              },
            ]}
            classNames={{
              indicator: "!rounded-full",
            }}
          />
          <SegmentedControl
            size="xs"
            value={colorScheme}
            onChange={setColorScheme}
            data={[
              {
                label: (
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <MoonIcon className="size-5" /> {t("general.darkMode")}
                  </div>
                ),
                value: "dark",
              },
              {
                label: (
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <SunIcon className="size-5" /> {t("general.lightMode")}
                  </div>
                ),
                value: "light",
              },
            ]}
            classNames={{
              indicator: "!rounded-full",
            }}
          />
        </div>
      </Stack>
    </AppShell.Navbar>
  )
}

export default Navbar
