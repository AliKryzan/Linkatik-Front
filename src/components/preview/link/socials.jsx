import { Group, ScrollArea } from "@mantine/core"
import { MailsIcon } from "lucide-react"
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaSquareXTwitter,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6"

import { cn } from "@/lib/utils"

const SocialsPreview = ({ block, className, onClick }) => {
  const socialsArray = [
    "email",
    "phone",
    "whatsapp",
    "telegram",
    "linkedin",
    "facebook",
    "twitter",
    "instagram",
    "youtube",
  ]
  const icons = {
    phone: <FaPhone size={34} className="rounded-full bg-white p-1.5" />,
    email: <MailsIcon size={41} className="rounded-full bg-white p-1.5" />,
    linkedin: <FaLinkedin size={41} className="rounded-full bg-white p-1.5 text-sky-500" />,
    facebook: <FaFacebook size={41} className="rounded-full bg-white p-1.5 text-blue-600" />,
    instagram: <FaInstagram size={41} className="rounded-full bg-white p-1.5 text-pink-500" />,
    youtube: <FaYoutube size={41} className="rounded-full bg-white p-1.5 text-red-500" />,
    telegram: <FaTelegram size={41} className="rounded-full bg-white p-1.5 text-sky-600" />,
    twitter: <FaSquareXTwitter size={41} className="rounded-full bg-white p-1.5 text-black" />,
    tiktok: <FaTiktok size={41} className="rounded-full bg-white p-1.5 text-blue-600" />,
    whatsapp: <FaWhatsapp size={41} className="rounded-full bg-white p-1.5 text-green-600" />,
  }
  return (
    <ScrollArea w={300} className={cn("!py-2.5", className)}>
      <div className="flex items-center justify-center gap-5 py-2.5">
        {socialsArray.map((element) => {
          // Only render the social media icon if it has a value in block.settings
          return block.settings[element] ? (
            <a
              key={element}
              onClick={onClick}
              href={
                element === "email"
                  ? `mailto:${block.settings[element]}`
                  : element === "phone"
                    ? `tel:${block.settings[element]}`
                    : block.settings[element]
              }
              target="_blank"
              rel="noopener noreferrer">
              {icons[element]}
            </a>
          ) : null
        })}
      </div>
    </ScrollArea>
  )
}

export default SocialsPreview
