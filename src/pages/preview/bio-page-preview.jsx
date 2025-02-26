import { useEffect, useRef } from "react"
import { groupAvatar, imagePlaceholder, logo } from "@/assets"
import { AuthLinkatikApi } from "@/services"
import { GetPageAppearance, GetPagePreview } from "@/services/utils"
import { setMain_button_color, setMain_text_color } from "@/store/General-variables/General-variables"
import { generateWebComponent } from "@/utils/generate-web-component"
import { ActionIcon, Box, Button, Group, Image, Modal, Stack, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Bell, Loader2, Share } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useLocation, useParams } from "react-router-dom"

import Error from "@/components/common/error"
import Loader from "@/components/common/loader"
import RenderBackground from "@/components/common/render-background"
import SubscribeForm from "@/components/common/subscribe-form"
import BlockPreviewWrapper from "@/components/preview/link/block-preview-wrapper"

const usePageVisitTracking = (path) => {
  const requestSentRef = useRef(false)
  
  useEffect(() => {
    if (requestSentRef.current || !path) return
  
    const trackPageVisit = async () => {
      try {
        const geoResponse = await axios.get("https://ipapi.co/json")
        const userAgent = window.navigator.userAgent
        const deviceInfo = {
          device: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent) ? "mobile" : "desktop",
          os: /Windows/.test(userAgent)
            ? "windows"
            : /Mac/.test(userAgent)
              ? "macos"
              : /Linux/.test(userAgent)
                ? "linux"
                : /Android/.test(userAgent)
                  ? "android"
                  : /iOS/.test(userAgent)
                    ? "ios"
                    : "other",
          browser: /Chrome/.test(userAgent)
            ? "Chrome"
            : /Firefox/.test(userAgent)
              ? "Firefox"
              : /Safari/.test(userAgent)
                ? "Safari"
                : /Edge/.test(userAgent)
                  ? "Edge"
                  : "other",
        }
  
        const analyticsData = {
          path,
          device: deviceInfo.device,
          os: deviceInfo.os,
          browser: deviceInfo.browser,
          country: geoResponse.data.country_name,
          city: geoResponse.data.city,
        }
  
        await AuthLinkatikApi.post("/bio-page-stats", analyticsData)
        requestSentRef.current = true
      } catch (error) {
        console.error("Error tracking page visit:", error)
      }
    }
  
    trackPageVisit()
  }, [path])
}

// Header component with share and subscribe buttons
const PageHeader = ({ onSubscribe, emailSignup, bioPageId }) => {
  const { t } = useTranslation()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Group justify="space-between">
      <ActionIcon
        size={"lg"}
        variant="white"
        color="black"
        style={{ boxShadow: "0 0 8px #ccc" }}
        radius={"xl"}>
        <Share size={18} />
      </ActionIcon>
      {emailSignup && (
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
              <SubscribeForm close={close} bio_page_id={bioPageId} title={t("bioPage.subscribe")} />
            </Modal.Content>
          </Modal.Root>
        </>
      )}
    </Group>
  )
}

const Preview = ({ isStandAlonePage = false }) => {
  const dispatch = useDispatch()
  const { path } = useParams()
  const location = useLocation()
  const { t } = useTranslation()

  // Fetch page data and appearance
  const { data, status, isFetching } = useQuery({
    queryKey: ["bio-page-preview", path],
    queryFn: () => GetPagePreview(path),
  })

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

  // Track page visits
  usePageVisitTracking(path)

  // Update theme colors
  useEffect(() => {
    if (data?.data?.appearance?.bio_link) {
      dispatch(setMain_button_color(data.data.appearance.bio_link.button_color))
      dispatch(setMain_text_color(data.data.appearance.bio_link.text_color))
    }
  }, [data, dispatch])

  // Handle loading and error states
  if (status === "pending" || statusAppearance === "pending") return <Loader />
  if (status === "error" || statusAppearance === "error") return <Error />
  if (status === "success" && !data.data) return <Error />

  // Generate background component
  const isPreview = location.pathname.includes("preview")
  const backgroundSettings = appearanceData.appearance?.bio_page ?? { html: "", css: "" }
  const { html, css } = backgroundSettings
  const encapsulated = generateWebComponent("custom-background-" + Math.random(), html, css)

  return (
    <div
      className={`relative overflow-hidden ${isStandAlonePage ? "flex min-h-dvh items-center justify-center" : ""}`}>
      <Stack
        style={{
          position: "relative",
          zIndex: 1,
          height: isPreview ? "unset" : undefined,
          borderRadius: "2.9rem !important",
          overflow: "hidden",
        }}
        className="preview-page bio-page-preview relative !z-10 !h-[613px] !max-w-80 rounded-[2.9rem] border-[1rem] border-[#404040]"
        gap={"xl"}
        justify="space-between"
        p={"md"}
        bg="">
        <RenderBackground
          encapsulated={encapsulated}
          style={{
            position: "absolute",
            top: 13,
            inset: 0,
            zIndex: -1,
          }}
        />

        {(isUpdatingAppearance || isFetching) && (
          <Group className="preview-loader-indicator">
            <Loader2 size={18} className="spinner" color="gray" />
            loading
          </Group>
        )}

        <Stack gap={"lg"}>
          <PageHeader 
            emailSignup={data.data.settings?.email_singup}
            bioPageId={data.data.id}
          />

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
            {data?.data?.blocks?.map((block) => (
              <BlockPreviewWrapper
                theme={appearanceData?.appearance?.bio_link}
                pageId={data.data.id}
                key={block.id}
                block={block}
              />
            ))}
          </Stack>
        </Stack>

        {!data.data.settings?.hide_logo && (
          <Group justify="center" mt={"lg"}>
            <img src={logo} alt="linkatik" />
          </Group>
        )}
      </Stack>
    </div>
  )
}

export default Preview
