import { cn } from "@/lib/utils"
import AudioPlayer from "../../ui/audio-player"
import Default from "./default"

const AppleMusic = ({ block,className }) => {
  if (block.settings.link_behavior === "target") return <Default block={block} />

  if (!block.settings.audioUrl)
    return (
      <a href={block.url} target="_blank" className="link-preview iframe apple_music">
        <p className="block-title">{block.title}</p>
        <div className="iframe-wrapper">
          <img className="thumbnail" src={block.settings?.thumbnailUrl || ""} alt={"cover"} />
        </div>
      </a>
    )

  return (
    <div className={cn("link-preview iframe apple_music",className)}>
      <p className="block-title">{block.title}</p>
      <div className="iframe-wrapper">
        <img className="thumbnail" src={block.settings?.thumbnailUrl || ""} alt={"cover"} />
        <AudioPlayer src={block.settings.audioUrl} />
      </div>
    </div>
  )
}

export default AppleMusic
