import { useEffect } from "react"
import { groupAvatar, imagePlaceholder, logo } from "@/assets"
import { GetPageAppearance, GetPagePreview } from "@/services/utils"
import { setMain_button_color, setMain_text_color } from "@/store/General-variables/General-variables"
import { generateWebComponent } from "@/utils/generate-web-component"
import { ActionIcon, Box, Button, Group, Image, Modal, Stack, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import { Bell, Loader2, Share } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import RenderBackground from "@/components/common/render-background"
import SubscribeForm from "@/components/common/subscribe-form"
import BlockPreviewWrapper from "@/components/preview/link/block-preview-wrapper"

const Preview = () => {
  const dispatch = useDispatch()
  const { path } = useParams()
  const { data, status, isFetching } = useQuery({
    queryKey: ["bio-page-preview", path],
    queryFn: () => GetPagePreview(path),
  })
  console.log("appearanceData -----------------------------------------")
  const {
    data: appearanceData,
    status: statusAppearance,
    isFetching: isUpdatingAppearance,
  } = useQuery({
    queryKey: ["bio-page-theme-preview", path],
    queryFn: () => GetPageAppearance(path),
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  console.log(data, appearanceData)

  useEffect(() => {
    dispatch(setMain_button_color(data?.data?.appearance?.bio_link?.button_color))
    dispatch(setMain_text_color(data?.data?.appearance?.bio_link?.text_color))
  }, [data])

  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)
  const location = useLocation()
  const isPreview = location.pathname.includes("preview")
  // console.log("🚀 ~ Preview ~ appearanceData:", appearanceData)
  if (status === "pending" || statusAppearance === "pending") return <Loader />
  if (status === "error" || statusAppearance === "error") return <Error />
  if (status === "success" && !data.data) return <Error />

  const backgroundSettings = appearanceData.appearance?.bio_page ?? { html: "", css: "" }
  const { html, css } = backgroundSettings
  const encapsulated = generateWebComponent("custom-background-" + Math.random(), html, css)

  const avatar = groupAvatar.find((item) => item.id === Number(data?.data.image_avatar))

  return (
    <>
      <RenderBackground
        encapsulated={encapsulated}
        style={{
          position: "fixed",
          inset: 0,
        }}
      />
      <Stack
        style={{
          position: "relative",
          zIndex: 1,
          height: isPreview ? "unset" : undefined,
          borderRadius: "2.9rem !important",
        }}
        className="preview-page bio-page-preview relative rounded-[2.9rem] overflow-hidden border-[1rem] border-gray-900"
        gap={"xl"}
        justify="space-between"
        p={"md"}
        bg="">
        <div className="absolute right-[29%] h-9 top-2 w-36 rounded-full bg-gray-950"></div>
        {(isUpdatingAppearance || isFetching) && (
          <Group className="preview-loader-indicator">
            <Loader2 size={18} className="spinner" color="gray" />
            loading
          </Group>
        )}

        <Stack gap={"lg"}>
          <Group justify="space-between">
            <ActionIcon
              size={"lg"}
              variant="white"
              color="black"
              style={{ boxShadow: "0 0 8px #ccc" }}
              radius={"xl"}>
              <Share size={18} />
            </ActionIcon>
            {data.data.settings?.email_singup ? (
              <>
                <Button
                  onClick={open}
                  leftSection={<Bell size={18} />}
                  variant="white"
                  color="black"
                  style={{ boxShadow: "0 0 8px #ccc" }}
                  radius={"xl"}>
                  Subscribe
                </Button>

                <Modal.Root centered opened={opened} onClose={close}>
                  <Modal.Overlay />
                  <Modal.Content component={"div"} radius={"xl"}>
                    <SubscribeForm close={close} bio_page_id={data.data.id} title={t("bioPage.subscribe")} />
                  </Modal.Content>
                </Modal.Root>
              </>
            ) : null}
          </Group>
          <div>
            <div>
              <Image
                mx={"auto"}
                h={120}
                w={120}
                radius={"50%"}
                fallbackSrc={imagePlaceholder}
                className={data?.data.image_type === "avatar" ? "rounded-full !border border-[#707070]" : ""}
                src={data?.data.image}
              />
            </div>
            <Box mt="lg">
              <Title order={1} fz={22} align={"center"}>
                {data.data.title}
              </Title>
              <Text fz={14} align={"center"}>
                {data.data.bio}
              </Text>
            </Box>
          </div>

          <Stack gap={"xl"} w={"100%"} maw={"360px"} mx={"auto"}>
            {data?.data?.blocks?.map((block) => {
              return (
                <>
                  <BlockPreviewWrapper
                    theme={appearanceData?.appearance?.bio_link}
                    pageId={data.data.id}
                    key={block.id}
                    block={block}
                  />
                </>
              )
            })}
          </Stack>
        </Stack>
        {data.data.settings?.hide_logo ? null : (
          <Group justify="center" mt={"lg"}>
            <img src={logo} alt="linkatik" />
          </Group>
        )}
      </Stack>
    </>
  )
}

export default Preview
