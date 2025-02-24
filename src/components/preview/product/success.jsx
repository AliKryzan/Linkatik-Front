import { Box, Button, Group, Image, Space, Stack, Text, Title } from "@mantine/core"
import { Tag } from "lucide-react"
import { useTranslation } from "react-i18next"

import { logo, startSelling } from "@/assets"
import { Link } from "@/lib/i18n/navigation"
import Spikes from "../../ui/spikes"

const Success = () => {
  const { t } = useTranslation()

  return (
    <Stack p="0">
      <div>
        <Box p="md" bg={"#8938B2"}>
          <Stack gap={"sm"} pb="xl">
            <Box p="lg" w={75} h={75} bg={"#262626"} style={{ borderRadius: "12px" }}>
              <Tag color="white" size={37} strokeWidth="1.3" />
            </Box>
            <div>
              <Title c={"white"} size={"h2"} fw={700}>
                {t("product-preview.success.title")}
              </Title>
              <Title c={"white"} size={"h2"} fw={700}>
                {t("product-preview.success.sub-title")}
              </Title>
            </div>
          </Stack>
        </Box>
        <Spikes />
      </div>
      <Space />
      <Space />
      <Stack px="sm">
        <Text size="lg" fw={500}>
          {t("product-preview.success.description")}
        </Text>
        <Space />
        <Text size="lg" fw={500}>
          {t("product-preview.success.needs-help.title")}
        </Text>
        <div>
          <Button fullWidth={false} color="black" fw={700}>
            {t("product-preview.success.needs-help.button")}
          </Button>
        </div>
      </Stack>

      <Box p="md">
        <Box bg={"primary.0"} style={{ borderRadius: "14px" }}>
          <Group gap="0" wrap="nowrap">
            <Stack gap={"sm"} w={"50%"} p="md">
              <Title size={"h3"} order={3} fw={600} c={"primary.8"}>
                {t("product-preview.success.start-selling.title")}
              </Title>
              <div>
                <Button color="black" fw={700}>
                  {t("product-preview.success.start-selling.button")}
                </Button>
              </div>
            </Stack>
            <Box w={"50%"}>
              <Image fit="cover" w={"100%"} h={"100%"} src={startSelling} alt="start- selling" />
            </Box>
          </Group>
        </Box>
      </Box>
      <Group component={Link} href="/" justify="center" my={"lg"}>
        <img src={logo} alt="linkatik" />
      </Group>
    </Stack>
  )
}

export default Success
