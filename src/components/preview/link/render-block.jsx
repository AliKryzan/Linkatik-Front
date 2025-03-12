import { BlocksWithLinkBehavior } from "@/config/bio-blocks"
import { AuthLinkatikApi } from "@/services"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

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
import LockIndicator from "./lock-indicator"
import Product from "./product"
import SocialsPreview from "./socials"
import Text from "./text"
import TwitchPreview from "./twitch"
import VideoPreview from "./video"

const RenderBlock = (props) => {
  // Get priority settings from the block
  const { id, path } = useParams()
  const { block, theme } = props
  const hasPriority = block.priority?.is_enable
  const priorityType = block.priority?.type
  const animationType = block.priority?.animation
  const queryClient = useQueryClient()

  // Check if the block has scheduling enabled and if it should be displayed based on current time
  const hasSchedule = block.schedule?.is_enable
  const startDate = hasSchedule ? new Date(block.schedule.start_date) : null
  const endDate = hasSchedule ? new Date(block.schedule.end_date) : null
  const currentDate = new Date()

  // If scheduling is enabled but current time is outside the schedule window, don't render the block
  if (hasSchedule && (currentDate < startDate || currentDate > endDate)) {
    console.log("Block not displayed due to scheduling", {
      blockId: block.id,
      currentDate,
      startDate,
      endDate,
    })
    return null
  }

  // Track block clicks
  const trackBlockClick = () => {
    try {
      if (block && block.id) {
        AuthLinkatikApi.post("/bio-block-clicks", { bio_block_id: block.id }).catch((error) =>
          console.error("Error tracking block click:", error),
        )
        queryClient.invalidateQueries({ queryKey: ["bio-page", id, path] })
      }
    } catch (error) {
      console.error("Error in trackBlockClick:", error)
    }
  }

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
      <>
        {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
        <Component
          {...props}
          onClick={trackBlockClick}
          className={`${props.className || ""} ${animationClass}`}
          style={{
            ...props.style,
            backgroundColor: theme?.button_color ?? "#FFFFFF",
            color: theme?.text_color ?? "#FFFFFF",
          }}
        />
      </>
    )
  }
  // console.log("BlocksWithLinkBehavior ========>",props)
  const type = BlocksWithLinkBehavior.find((e) => e === props.block.type) ? "link_behavior" : props.block.type
  console.log("type ==========>", type)
  console.log("priority settings ==========>", { hasPriority, priorityType, animationType, animationClass })
  if (hasSchedule) {
    console.log("schedule settings ==========>", {
      hasSchedule,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      currentDate: currentDate.toISOString(),
      isActive: currentDate >= startDate && currentDate <= endDate,
    })
  }

  // If no priority is set, render normally without animation wrapper
  if (!hasPriority) {
    switch (type) {
      case "link_behavior":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <CustomLinkBehavior
              {...props}
              onClick={trackBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
          </>
        )
      case "twitch":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <TwitchPreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "header":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <HeaderPreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "file":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <FilePreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "audio":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <AudioPreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "image":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <ImagePreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "video":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
          <VideoPreview
              {...props}
              onClick={trackBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
          </>
        )
      case "countdown":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <CountDown {...props} onClick={trackBlockClick} />
          </>
        )
      case "contact_form":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <ContactForm {...props} onClick={trackBlockClick} />
          </>
        )
      case "faq":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <FaqPreview
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
              onClick={trackBlockClick}
              {...props}
            />
          </>
        )
      case "image_slider":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <ImageSliderPreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "divider":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <DividerPreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "text_block":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <Text {...props} onClick={trackBlockClick} />
          </>
        )
      case "socials":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <SocialsPreview {...props} onClick={trackBlockClick} />
          </>
        )
      case "apple_music":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <AppleMusic {...props} onClick={trackBlockClick} />
          </>
        )
      case "email_collector":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <EmailCollector
              {...props}
              onClick={trackBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
          </>
        )
      case "zid":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <Product {...props} onClick={trackBlockClick} />
          </>
        )
      case "product":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <Product {...props} onClick={trackBlockClick} />
          </>
        )
      case "salla":
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <Product {...props} onClick={trackBlockClick} />
          </>
        )
      default:
        return (
          <>
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            <Default
              {...props}
              onClick={trackBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
          </>
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
