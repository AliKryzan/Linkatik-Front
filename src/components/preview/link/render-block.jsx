import { BlocksWithLinkBehavior } from "../../../config/bio-blocks"
import AppleMusic from "./apple-music"
import AudioPreview from "./audio"
import ContactForm from "./contact-form"
import CountDown from "./count-down"
import CustomLinkBehavior from "./custom-link-behavior"
import Default from "./default"
import DividerPreview from "./divider"
import EmailCollector from "./email-collector"
import FaqPreview from "./faq"
import FilePreview from "./file"
import HeaderPreview from "./header"
import ImagePreview from "./image"
import ImageSliderPreview from "./image-slider"
import Product from "./product"
import SocialsPreview from "./socials"
import Text from "./text"
import TwitchPreview from "./twitch"
import VideoPreview from "./video"

const RenderBlock = (props) => {

  // console.log("BlocksWithLinkBehavior ========>",props)
  const type = BlocksWithLinkBehavior.find((e) => e === props.block.type) ? "link_behavior" : props.block.type

  // console.log("type ==========>",type)
  switch (type) {
    case "link_behavior":
      return <CustomLinkBehavior {...props} />
    case "twitch":
      return <TwitchPreview {...props} />
    case "header":
      return <HeaderPreview {...props} />
    case "file":
      return <FilePreview {...props} />
    case "audio":
      return <AudioPreview {...props} />
    case "image":
      return <ImagePreview {...props} />
    case "video":
      return <VideoPreview {...props} />
    case "countdown":
      return <CountDown {...props} />
    case "contact_form":
      return <ContactForm {...props} />
    case "faq":
      return <FaqPreview {...props} />
    case "image_slider":
      return <ImageSliderPreview {...props} />
    case "divider":
      return <DividerPreview {...props} />
    case "text_block":
      return <Text {...props} />
    case "socials":
      return <SocialsPreview {...props} />
    case "apple_music":
      return <AppleMusic {...props} />
    case "email_collector":
      return <EmailCollector {...props} />
    case "product":
      return <Product {...props} />
    case "salla":
      return <Product {...props} />
    default:
      return <Default {...props} />
  }
}

export default RenderBlock
