import { useEffect, useRef } from "react"
import { groupAvatar, imagePlaceholder, logo } from "@/assets"
import { AuthLinkatikApi } from "@/services"
import { GetPageAppearance, GetPagePreview } from "@/services/utils"
import { setMain_button_color, setMain_text_color } from "@/store/General-variables/General-variables"
import { generateWebComponent } from "@/utils/generate-web-component"
import { ActionIcon, Box, Button, Container, Group, Image, Modal, Stack, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Bell, Copy, Loader2, LoaderCircle, MessageCircle, Share, X as XIcon } from "lucide-react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import Loader from "@/components/common/loader"
import RenderBackground from "@/components/common/render-background"
import SubscribeForm from "@/components/common/subscribe-form"
import BlockPreviewWrapper from "@/components/preview/link/block-preview-wrapper"
import ShareModal from "./share-modal"

const Error = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <Container className="px-4">
        <Stack className="mx-auto max-w-md space-y-8 text-center">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 -translate-y-4 transform rounded-full bg-gradient-to-r from-purple-600/30 to-purple-800/30 blur-2xl" />
              <div className="relative inline-block rounded-full bg-white p-6 shadow-xl">
                <svg
                  className="h-20 w-20 text-purple-600 dark:text-purple-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <Title className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-3xl font-bold text-transparent dark:from-purple-400 dark:to-purple-600">
                {t("errors.noAccountTitle", "Account Not Found")}
              </Title>
              <Text className="text-lg text-gray-600">
                {t(
                  "errors.noAccountDescription",
                  "The account you're looking for doesn't exist or has been removed.",
                )}
              </Text>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              variant="light"
              radius="xl"
              size="lg"
              className="shadow-sm transition-all hover:bg-purple-50 hover:shadow-md">
              {t("general.goBack", "Go Back")}
            </Button>
            <Button
              onClick={() => navigate("/")}
              radius="xl"
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-800 shadow-md transition-all hover:-translate-y-0.5 hover:from-purple-700 hover:to-purple-900 hover:shadow-xl">
              {t("general.goHome", "Go Home")}
            </Button>
          </div>
        </Stack>
      </Container>
    </div>
  )
}

const Preview = ({ isStandAlonePage = false }) => {
  const dispatch = useDispatch()
  const { bioImage, image_type, uploadedImage } = useSelector((state) => state.GeneralSlice)
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
  const requestSentRef = useRef(false)

  useEffect(() => {
    const trackPageVisit = async () => {
      if (requestSentRef.current) return
      try {
        // Get geolocation data
        const geoResponse = await axios.get("https://ipapi.co/json")

        // Get device/browser info
        const userAgent = window.navigator.userAgent
        const deviceInfo = {
          device: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(userAgent) ? "mobile" : "desktop",
          os: /Android/.test(userAgent)
            ? "android"
            : /iOS/.test(userAgent)
              ? "ios"
              : /Windows/.test(userAgent)
                ? "windows"
                : /Mac/.test(userAgent)
                  ? "macos"
                  : /Linux/.test(userAgent)
                    ? "linux"
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

        // Get referrer information
        const referrer = document.referrer || "direct"

        // Combine analytics data
        const analyticsData = {
          path,
          device: deviceInfo.device,
          os: deviceInfo.os,
          browser: deviceInfo.browser,
          country: geoResponse.data.country_name,
          city: geoResponse.data.city,
          referrer,
        }

        // Send to your analytics endpoint
        await AuthLinkatikApi.post("/bio-page-stats", analyticsData)
        requestSentRef.current = true
      } catch (error) {
        console.error("Error tracking page visit:", error)
      }
    }
    if (path && isStandAlonePage) {
      trackPageVisit()
    }
  }, [path])

  dispatch(setMain_button_color(data?.data?.appearance?.bio_link?.button_color))
  dispatch(setMain_text_color(data?.data?.appearance?.bio_link?.text_color))
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

  // useEffect(() => {
  //   getPageStats()
  // }, [])
  return (
    <div
      className={`${isStandAlonePage ? "flex min-h-dvh items-center justify-center" : ""} flex min-h-dvh items-center justify-center`}>
      <Stack
        style={{
          position: "relative",
          zIndex: 1,
          // height: isPreview ? "unset" : undefined,
          overflow: "hidden",
        }}
        className="preview-page bio-page-preview !z-10 !m-7 !h-[630px] max-w-[23rem] !min-w-80 rounded-[3rem] border-[6px] border-[#ebebeb] shadow-[0_121px_49px_rgba(0,0,0,0.02),0_18px_41px_rgba(0,0,0,0.08),0_30px_30px_rgba(0,0,0,0.14),0_8px_17px_rgba(0,0,0,0.16)] lg:!h-[730px] lg:!min-w-[23rem]"
        gap={"xl"}
        justify="space-between"
        p={"md"}
        bg="">
        {/* Share Modal */}
        <RenderBackground
          encapsulated={encapsulated}
          style={{
            position: "absolute",
            top: 13,
            inset: 0,
            zIndex: -1,
          }}
        />
        {/* <div className="fixed top-7 right-[30%] h-9 w-36 rounded-full bg-gray-950"></div> */}
        {(isUpdatingAppearance || isFetching) && (
          <Group className="preview-loader-indicator">
            <LoaderCircle size={18} className="animate-spin" />
            Loading...
          </Group>
        )}

        <Stack gap={"lg"} className="overflow-y-auto">
          <Group justify="space-between">
            <ShareModal data={data} />
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
                src={data?.data.image_type === "avatar" ? bioImage?.image : data?.data.image}
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
          <div className="ms-2.5">
            <Stack gap={"xl"} w={"100%"}>
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
          </div>
        </Stack>
        {data.data.settings?.hide_logo ? null : (
          <Group justify="center" mt={"lg"}>
            <img src={logo} alt="linkatik" />
          </Group>
        )}
      </Stack>
    </div>
  )
}

export default Preview
