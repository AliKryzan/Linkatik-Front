import { BlocksWithLinkBehavior } from "@/config/bio-blocks"
import { AuthLinkatikApi } from "@/services"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
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
import LockModals from "./lock-modals"
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
  
  // State for lock modal
  const [lockModalOpen, setLockModalOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

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
  
  // Handle block click with lock check
  const handleBlockClick = (e) => {
    if (block.lock_options && !isVerified) {
      e.preventDefault()
      e.stopPropagation()
      setLockModalOpen(true)
      return
    }
    
    // If no lock or already verified, proceed with normal click
    trackBlockClick()
    if (props.onClick) props.onClick(e)
  }
  
  // Handle verification success
  const handleVerified = () => {
    setIsVerified(true)
    // Allow a small delay before auto-clicking the block
    setTimeout(() => {
      trackBlockClick()
    }, 500)
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
        <Component
          {...props}
          onClick={handleBlockClick}
          className={`${props.className || ""} ${animationClass}`}
          style={{
            ...props.style,
            backgroundColor: theme?.button_color ?? "#FFFFFF",
            color: theme?.text_color ?? "#FFFFFF",
          }}
        />
        {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
        {block.lock_options && (
          <LockModals
            isOpen={lockModalOpen}
            onClose={() => setLockModalOpen(false)}
            lockOptions={block.lock_options}
            blockId={block.id}
            onVerified={handleVerified}
          />
        )}
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
            <CustomLinkBehavior
              {...props}
              onClick={handleBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "twitch":
        return (
          <>
            <TwitchPreview {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "header":
        return (
          <>
            <HeaderPreview {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "file":
        return (
          <>
            <FilePreview {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "audio":
        return (
          <>
            <AudioPreview {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "image":
        return (
          <>
            <ImagePreview {...props} onClick={handleBlockClick} />
            {/* {block.lock_options && <LockIndicator lockOptions={block.lock_options} />} */}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "video":
        return (
          <>
            <VideoPreview
              {...props}
              onClick={handleBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "countdown":
        return (
          <>
            <CountDown {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "contact_form":
        return (
          <>
            <ContactForm {...props} onClick={handleBlockClick}     style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "faq":
        return (
          <>
            <FaqPreview
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
              onClick={handleBlockClick}
              {...props}
            />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "image_slider":
        return (
          <>
            <ImageSliderPreview {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "divider":
        return (
          <>
            <DividerPreview {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "text_block":
        return (
          <>
            <Text {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "socials":
        return (
          <>
            <SocialsPreview {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "apple_music":
        return (
          <>
            <AppleMusic {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "email_collector":
        return (
          <>
            <EmailCollector
              {...props}
              onClick={handleBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "zid":
        return (
          <>
            <Product {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "product":
        return (
          <>
            <Product {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      case "salla":
        return (
          <>
            <Product {...props} onClick={handleBlockClick} />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
          </>
        )
      default:
        return (
          <>
            <Default
              {...props}
              onClick={handleBlockClick}
              style={{
                ...props.style,
                backgroundColor: theme?.button_color ?? "#FFFFFF",
                color: theme?.text_color ?? "#FFFFFF",
              }}
            />
            {block.lock_options && <LockIndicator lockOptions={block.lock_options} />}
            {block.lock_options && (
              <LockModals
                isOpen={lockModalOpen}
                onClose={() => setLockModalOpen(false)}
                lockOptions={block.lock_options}
                blockId={block.id}
                onVerified={handleVerified}
              />
            )}
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
