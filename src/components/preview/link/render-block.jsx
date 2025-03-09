import { BlocksWithLinkBehavior } from "@/config/bio-blocks"

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
  // Get priority settings from the block
  const { block, theme } = props
  const hasPriority = block.priority?.is_enable
  const priorityType = block.priority?.type
  const animationType = block.priority?.animation

  // Determine animation class based on priority settings
  let animationClass = ""
  if (hasPriority && priorityType === "animation" && animationType) {
    animationClass = `animate-${animationType}`
  } else if (hasPriority && priorityType === "spotlight") {
    animationClass = "spotlight max-w-70 ms-2"
  }
  // Wrap the component with the animation class and theme styles
  const renderWithAnimation = (Component) => {
    return (
      <Component
        {...props}
        className={`${props.className || ""} ${animationClass}`}
        style={{
          ...props.style,
          backgroundColor: theme?.button_color ?? "#FFFFFF",
          color: theme?.text_color ?? "#FFFFFF",
        }}
      />
    )
  }
  // console.log("BlocksWithLinkBehavior ========>",props)
  const type = BlocksWithLinkBehavior.find((e) => e === props.block.type) ? "link_behavior" : props.block.type
  console.log("type ==========>", type)
  console.log("priority settings ==========>", { hasPriority, priorityType, animationType, animationClass })

  // If no priority is set, render normally without animation wrapper
  if (!hasPriority) {
    switch (type) {
      case "link_behavior":
        return (
          <CustomLinkBehavior
            {...props}
            style={{
              ...props.style,
              backgroundColor: theme?.button_color ?? "#FFFFFF",
              color: theme?.text_color ?? "#FFFFFF",
            }}
          />
        )
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
        return (
          <VideoPreview
            {...props}
            style={{
              ...props.style,
              backgroundColor: theme?.button_color ?? "#FFFFFF",
              color: theme?.text_color ?? "#FFFFFF",
            }}
          />
        )
      case "countdown":
        return <CountDown {...props} />
      case "contact_form":
        return <ContactForm {...props} />
      case "faq":
        return <FaqPreview  style={{
          ...props.style,
          backgroundColor: theme?.button_color ?? "#FFFFFF",
          color: theme?.text_color ?? "#FFFFFF",
        }} {...props} />
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
      case "zid":
        return <Product {...props} />
      case "product":
        return <Product {...props} />
      case "salla":
        return <Product {...props} />
      default:
        return (
          <Default
            {...props}
            style={{
              ...props.style,
              backgroundColor: theme?.button_color ?? "#FFFFFF",
              color: theme?.text_color ?? "#FFFFFF",
            }}
          />
        )
    }
  }

  // If priority is set, render with animation wrapper
  switch (type) {
    case "link_behavior":
      return renderWithAnimation(CustomLinkBehavior)
    case "twitch":
      return renderWithAnimation(TwitchPreview)
    case "header":
      return renderWithAnimation(HeaderPreview)
    case "file":
      return renderWithAnimation(FilePreview)
    case "audio":
      return renderWithAnimation(AudioPreview)
    case "image":
      return renderWithAnimation(ImagePreview)
    case "video":
      return renderWithAnimation(VideoPreview)
    case "countdown":
      return renderWithAnimation(CountDown)
    case "contact_form":
      return renderWithAnimation(ContactForm)
    case "faq":
      return renderWithAnimation(FaqPreview)
    case "image_slider":
      return renderWithAnimation(ImageSliderPreview)
    case "divider":
      return renderWithAnimation(DividerPreview)
    case "text_block":
      return renderWithAnimation(Text)
    case "socials":
      return renderWithAnimation(SocialsPreview)
    case "apple_music":
      return renderWithAnimation(AppleMusic)
    case "email_collector":
      return renderWithAnimation(EmailCollector)
    case "zid":
      return renderWithAnimation(Product)
    case "product":
      return renderWithAnimation(Product)
    case "salla":
      return renderWithAnimation(Product)
    default:
      return renderWithAnimation(Default)
  }
}

export default RenderBlock
