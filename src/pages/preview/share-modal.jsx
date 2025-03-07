import { ActionIcon, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Copy, ShareIcon } from "lucide-react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { FaFacebook, FaFacebookMessenger, FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6"
import { useSelector } from "react-redux"

const ShareModal = ({ data }) => {
  const { t } = useTranslation()
  const { bioImage } = useSelector((state) => state.GeneralSlice)
  // Share modal state
  const [shareModalOpened, { open: openShareModal, close: closeShareModal }] = useDisclosure(false)

  const handleCopyLink = () => {
    const linkToCopy = `${window.location.origin}/preview/${path}`
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        toast.success(t("general.copied", "Link copied to clipboard"))
        closeShareModal()
      })
      .catch(() => {
        toast.error(t("general.copyFailed", "Failed to copy link"))
      })
  }

  const handleShareSocial = (platform) => {
    const url = encodeURIComponent(`${window.location.origin}/preview/${path}`)
    const title = encodeURIComponent(data?.data?.title || "Check out my Linkatik page")
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "messenger":
        shareUrl = `https://www.facebook.com/dialog/send?link=${url}&app_id=291494419107518&redirect_uri=${url}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer")
    closeShareModal()
  }

  return (
    <>
      <ActionIcon
        onClick={openShareModal}
        size={"lg"}
        variant="white"
        color="black"
        style={{ boxShadow: "0 0 8px #ccc" }}
        radius={"xl"}>
        <ShareIcon size={18} />
      </ActionIcon>

      <Modal.Root
        opened={shareModalOpened}
        onClose={closeShareModal}
        centered
        className="!h-auto !max-h-full !w-full sm:!max-w-[348px] md:!max-w-[520px]">
        <Modal.Overlay blur={3} opacity={0.55} />
        <Modal.Content className="overflow-hidden p-6" radius="lg">
          <div class="relative flex w-full items-center justify-between">
            <div class="flex grow items-center justify-center">
              <div class="h-6">
                <p class="font-semibold">{t("general.share")}</p>
              </div>
            </div>
            <Modal.CloseButton className="absolute top-0 right-4 !bg-white/20 !text-white hover:!bg-white/30" />
          </div>
          <div className="my-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-2 text-white">
            <div className="flex flex-col items-center">
              <img
                src={data?.data.image_type === "avatar" ? bioImage?.image : data?.data.image}
                className="mb-3 size-20 rounded-full border-2 border-white object-cover sm:size-30 lg:size-40"
              />
              <Text fw={600} size="lg" className="mb-1">
                {data?.data?.title || "My Linkatik"}
              </Text>
              <Text size="sm" opacity={0.9}>
                Share this page with your friends
              </Text>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-2 grid grid-cols-3 gap-4">
              {/* Copy Link Button */}
              <div className="flex flex-col items-center" onClick={handleCopyLink}>
                <div className="mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200">
                  <Copy size={20} className="text-gray-700" />
                </div>
                <Text size="xs" align="center">
                  Copy Link
                </Text>
              </div>

              {/* Twitter/X Button */}
              <div className="flex flex-col items-center" onClick={() => handleShareSocial("twitter")}>
                <div className="mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black transition-opacity hover:opacity-80">
                  <FaXTwitter size={20} className="text-white" />
                </div>
                <Text size="xs" align="center">
                  X
                </Text>
              </div>

              {/* Facebook Button */}
              <div className="flex flex-col items-center" onClick={() => handleShareSocial("facebook")}>
                <div className="mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-600 transition-colors hover:bg-blue-700">
                  <FaFacebook size={20} className="text-white" />
                </div>
                <Text size="xs" align="center">
                  Facebook
                </Text>
              </div>

              {/* WhatsApp Button */}
              <div className="flex flex-col items-center" onClick={() => handleShareSocial("whatsapp")}>
                <div className="mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-green-600">
                  <FaWhatsapp size={20} className="text-white" />
                </div>

                <Text size="xs" align="center">
                  WhatsApp
                </Text>
              </div>

              {/* LinkedIn Button */}
              <div className="flex flex-col items-center" onClick={() => handleShareSocial("linkedin")}>
                <div className="mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-700 transition-colors hover:bg-blue-800">
                  <FaLinkedin size={20} className="text-white" />
                </div>
                <Text size="xs" align="center">
                  LinkedIn
                </Text>
              </div>

              {/* Messenger Button */}
              <div className="flex flex-col items-center" onClick={() => handleShareSocial("messenger")}>
                <div className="mb-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-opacity hover:opacity-90">
                  <FaFacebookMessenger size={20} className="text-white" />
                </div>
                <Text size="xs" align="center">
                  Messenger
                </Text>
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default ShareModal
