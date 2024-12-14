import { ActionIcon, CopyButton, Group, rem, Text, Tooltip, useMantineColorScheme } from "@mantine/core"
import { Check, Copy } from "lucide-react"

const CopyPath = ({ pathname }) => {
  const linkToCopy = "linkatik.com/" + pathname
  const { colorScheme } = useMantineColorScheme()
  return (
    <Group
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
      <Text>linkatik.com/{pathname}</Text>
    </Group>
  )
}

export default CopyPath
