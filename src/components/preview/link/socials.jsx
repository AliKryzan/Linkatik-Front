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

const SocialsPreview = ({ block }) => {
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
    phone: <FaPhone size={31}  />,
    email: <MailsIcon size={31} className="" />,
    linkedin: <FaLinkedin size={31} className=" text-sky-500" />,
    facebook: <FaFacebook size={31} className=" text-blue-600" />,
    instagram: <FaInstagram size={31} className=" text-pink-500" />,
    youtube: <FaYoutube size={31} className=" text-red-500" />,
    telegram: <FaTelegram size={31} className=" text-sky-600" />,
    twitter: <FaSquareXTwitter size={31} className="text-black" />,
    tiktok: <FaTiktok size={31} className=" text-blue-600" />,
    whatsapp: <FaWhatsapp size={31} className=" text-green-600" />,
  }
  return (
    <ScrollArea w={300} className="!py-2.5" >
      <div className="flex items-center gap-5 py-2.5">
        {socialsArray.map((element) => {
          return (
            <a
              key={element}
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
          )
        })}
      </div>
    </ScrollArea>
  )
}

export default SocialsPreview
