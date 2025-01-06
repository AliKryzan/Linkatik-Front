import { ActionIcon, CopyButton, Group, rem, Text, Tooltip, useMantineColorScheme } from "@mantine/core"
import { Check, Copy } from "lucide-react"

import { BASE_URL } from "../../config"

const CopyPath = ({ pathname }) => {
  const linkToCopy = new URL(pathname, BASE_URL)
  const { colorScheme } = useMantineColorScheme()
  return (
    <Group
      wrap="nowrap"
      bg={colorScheme === "dark" ? "dark" : "gray.1"}
      radius="md"
      justify="space-between"
      px="lg"
      py={"3px"}
      ms={"22%"}
      style={{
        borderRadius: rem(8),
      }}>
      <CopyButton value={linkToCopy} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
            <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
              {copied ? <Check style={{ width: rem(16) }} /> : <Copy style={{ width: rem(16) }} />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
      <Text lineClamp={1}>{linkToCopy.toString().replace("https://", "")}</Text>
    </Group>
  )
}

export default CopyPath
