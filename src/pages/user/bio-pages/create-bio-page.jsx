import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  ScrollArea,
  SegmentedControl,
  Space,
  Stack,
  Text,
  Title,
  useDirection,
  useMantineColorScheme,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ChartAreaIcon, Eye, Settings, Stars, UserCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

import { useParams } from "@/lib/i18n/navigation"
import CopyPath from "@/components/common/copy-path"

import Preview from "../../preview/bio-page-preview"
import { PagesWrapper } from "./pages-wrapper"

const CreateBioPage = () => {
  const { path } = useParams()
  let [searchParams, setSearchParams] = useSearchParams()
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const segments = [
    {
      value: "links",
      label: (
        <Group justify="center" wrap="nowrap">
          <Flex align={"center"} display={{ base: "none", sm: "flex" }}>
            <UserCircle size={20} />
          </Flex>
          <Text fz={{ base: "13px", sm: "16px" }}>{t("bioPages.createPage.segments.links")}</Text>
        </Group>
      ),
    },
    {
      value: "appearance",
      label: (
        <Group align="center" justify="center" wrap="nowrap">
          <Flex align={"center"} display={{ base: "none", sm: "flex" }}>
            <Stars size={20} />
          </Flex>
          <Text fz={{ base: "13px", sm: "16px" }}>{t("bioPages.createPage.segments.appearance")}</Text>
        </Group>
      ),
    },
    {
      value: "analysis",

      label: (
        <Group justify="center" wrap="nowrap">
          <Flex align={"center"} display={{ base: "none", sm: "flex" }}>
            <ChartAreaIcon size={20} />
          </Flex>
          <Text fz={{ base: "13px", sm: "16px" }}>{t("bioPages.createPage.segments.analysis")}</Text>
        </Group>
      ),
    },
    {
      value: "settings",
      label: (
        <Group justify="center" wrap="nowrap">
          <Flex align={"center"} display={{ base: "none", sm: "flex" }}>
            <Settings size={20} />
          </Flex>
          <Text fz={{ base: "13px", sm: "16px" }}>{t("bioPages.createPage.segments.settings")}</Text>
        </Group>
      ),
    },
  ]

  const [opened, { open, close }] = useDisclosure(false)
  const { dir } = useDirection()

  const fullScreen = searchParams.get("tab") !== "analysis"

  const { colorScheme } = useMantineColorScheme()
  return (
    <>
      <Flex position="relative" direction={{ base: "column", lg: "row" }} align={"start"} gap={"xs"}>
        <Box w="100%" flex={1} style={{ zIndex: 1, position: "relative" }}>
          <Stack w="100%" maw={950} mx={"auto"} gap={"xl"}>
            <Title ta={fullScreen ? "unset" : "center"} order={2}>
              {t("bioPages.createPage.title")}
            </Title>
            <Box maw={fullScreen ? undefined : "800px"} w={"100%"} mx={fullScreen ? undefined : "auto"}>
              <SegmentedControl
                fullWidth
                onChange={(e) => setSearchParams({ tab: e })}
                size="md"
                radius={"lg"}
                dir="rtl"
                value={searchParams.get("tab") || "links"}
                withItemsBorders={false}
                data={segments}
              />
            </Box>
            <Space display={{ base: "none", md: "block" }} />
            <PagesWrapper componentKey={searchParams.get("tab") || "links"} />
          </Stack>
          {fullScreen && !opened && (
            <Button
              hiddenFrom="lg"
              radius={"xl"}
              size="sm"
              style={{
                position: "fixed",
                bottom: "20px",
                zIndex: 10,
                boxShadow: `0 0 4px ${colorScheme == "dark" ? "#121212d1" : "#ccc"}`,
              }}
              variant="white"
              leftSection={<Eye />}
              onClick={open}>
              {t("bioPages.createPage.preview")}
            </Button>
          )}
        </Box>
        {fullScreen ? (
          <Stack
            style={{
              position: "sticky",
              top: "100px",
            }}
            visibleFrom="lg"
            ms={-50}>
            <CopyPath pathname={"/preview/" + path} />
            <Group
              justify="end"
              style={{
                scale: "0.78",
                transformOrigin: language === "ar" ? "top left" : "top right",
              }}>
              <ScrollArea
                h={770}
                miw={380}
                style={{
                  borderRadius: "2.9rem",
                  backgroundColor: "transparent",
                  // boxShadow: `0 0 12px ${colorScheme == "dark" ? "#121212d1" : "#ccc"}`,
                }}>
                <Preview />
              </ScrollArea>
            </Group>
          </Stack>
        ) : null}
      </Flex>
      {fullScreen ? (
        <Modal.Root
          opened={opened}
          onClose={close}
          fullScreen
          radius={0}
          transitionProps={{ transition: "fade", duration: 200 }}>
          <Modal.Content>
            <Box className="absolute top-7 left-[13%] z-10">
              <Modal.CloseButton color="black" className="!bg-red-500/20 text-white" />
            </Box>
            <Modal.Body>
              <Preview />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      ) : null}
    </>
  )
}

export default CreateBioPage
