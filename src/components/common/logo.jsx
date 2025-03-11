import { useMantineColorScheme } from "@mantine/core"

import { Link } from "@/lib/i18n/navigation.jsx"

const Logo = (props) => {
  const { colorScheme } = useMantineColorScheme()
  return (
    <Link to="/">
      <img
        src={colorScheme === "light" ? "/logo-light.svg" : "/logo-dark.svg"}
        alt="linkatik"
        className={"logo"}
        {...props}
      />
    </Link>
  )
}

export default Logo
