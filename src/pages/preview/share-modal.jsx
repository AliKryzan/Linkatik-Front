import { useState } from "react"
import { ActionIcon, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { ChevronLeft, ChevronRight, Copy, Mail, MoreHorizontal, ShareIcon } from "lucide-react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import {
  FaFacebook,
  FaFacebookMessenger,
  FaLinkedin,
  FaSnapchat,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6"
import { useSelector } from "react-redux"

const ShareModal = ({ data ,children}) => {
  const { t } = useTranslation()
  const { bioImage } = useSelector((state) => state.GeneralSlice)
  const [shareModalOpened, { open: openShareModal, close: closeShareModal }] = useDisclosure(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const shareUrl = `${window.location.origin}/preview/${data?.path}`
  const encodedUrl = encodeURIComponent(shareUrl)
  const title = encodeURIComponent(data?.data?.title || "Check out my Linkatik page")

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success(t("general.copied", "Link copied to clipboard"))
        closeShareModal()
      })
      .catch(() => {
        toast.error(t("general.copyFailed", "Failed to copy link"))
      })
  }

  const handleShareSocial = (platform) => {
    if (platform === "more") {
      // Use Web Share API for native sharing if available
      if (navigator.share) {
        navigator
          .share({
            title: decodeURIComponent(title),
            url: shareUrl,
          })
          .then(() => {
            closeShareModal()
          })
          .catch((error) => {
            console.error("Error sharing:", error)
          })
      } else {
        toast.error(t("general.shareNotSupported", "Native sharing not supported on this device"))
      }
      return
    }

    if (platform === "email") {
      window.location.href = `mailto:?subject=${title}&body=${title}%20${encodedUrl}`
      closeShareModal()
      return
    }

    const platforms = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${title}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=291494419107518&redirect_uri=${encodedUrl}`,
      snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`,
    }
    window.open(platforms[platform], "_blank", "noopener,noreferrer")
    closeShareModal()
  }

  const shareOptions = [
    {
      platform: "copy",
      icon: <Copy size={20} className="text-gray-700" />,
      color: "bg-gray-100 hover:bg-gray-200",
    },
    {
      platform: "twitter",
      icon: <FaXTwitter size={20} className="text-white" />,
      color: "bg-black hover:opacity-80",
    },
    {
      platform: "facebook",
      icon: <FaFacebook size={20} className="text-white" />,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      platform: "whatsapp",
      icon: <FaWhatsapp size={20} className="text-white" />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      platform: "linkedin",
      icon: <FaLinkedin size={20} className="text-white" />,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      platform: "messenger",
      icon: <FaFacebookMessenger size={20} className="text-white" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-300 hover:opacity-90",
    },
    {
      platform: "snapchat",
      icon: <FaSnapchat size={20} className="text-black" />,
      color: "bg-yellow-300 hover:bg-yellow-400",
    },
    {
      platform: "email",
      icon: <Mail size={20} className="text-white" />,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      platform: "more",
      icon: <MoreHorizontal size={20} className="text-white" />,
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ]

  const itemsPerSlide = 3
  const totalSlides = Math.ceil(shareOptions.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const visibleOptions = shareOptions.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)

  return (
    <>
      <div className="" onClick={openShareModal}>
       {children}
      </div>

      <Modal.Root opened={shareModalOpened} onClose={closeShareModal} centered className="w-full max-w-md">
        <Modal.Overlay blur={3} opacity={0.55} />
        <Modal.Content className="overflow-hidden rounded-lg p-6">
          <div className="flex items-center justify-center">
            <Text fw={600} size="lg">
              {t("general.share")}
            </Text>
            <Modal.CloseButton className="!absolute !top-2 !right-3 !bg-white/20 hover:!bg-white/30" />
          </div>

          <div className="my-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4 text-center text-white">
            <img
              src={data?.data.image_type === "avatar" ? bioImage?.image : data?.data.image}
              className="mx-auto mb-3 h-24 w-24 rounded-full border-2 border-white object-cover"
            />
            <Text fw={600} size="lg">
              {data?.data?.title || "My Linkatik"}
            </Text>
            <Text size="sm" opacity={0.9}>
              {t("general.shareWithFriends", "Share this page with your friends")}
            </Text>
          </div>

          <div className="relative px-8">
            <div className="flex items-center justify-center gap-4 py-4 transition-all duration-300 ease-in-out">
              {visibleOptions.map(({ platform, icon, color }) => (
                <div
                  key={platform}
                  className="flex cursor-pointer flex-col items-center"
                  onClick={platform === "copy" ? handleCopyLink : () => handleShareSocial(platform)}>
                  <div className={`mb-1 flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
                    {icon}
                  </div>
                  <Text size="xs" align="center">
                    {t(`general.${platform}`)}
                  </Text>
                </div>
              ))}
            </div>

            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md hover:bg-white"
                  aria-label="Previous slide">
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow-md hover:bg-white"
                  aria-label="Next slide">
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${currentSlide === index ? "w-4 bg-purple-600" : "w-1.5 bg-gray-300"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default ShareModal
