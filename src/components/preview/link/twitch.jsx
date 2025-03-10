import { Group } from "@mantine/core"

import { cn } from "@/lib/utils"

import Default from "./default"

const TwitchPreview = ({ block, className,onClick }) => {
  if (block.settings.link_behavior === "target") return <Default block={block} />

  return (
    <div onClick={onClick} className={cn("link-preview iframe", className)}>
      <p className="block-title">{block.title}</p>
      <Group gap={"0"} grow wrap="nowrap" className="iframe-wrapper">
        {block.settings.link_behavior?.includes("channel") ? (
          <iframe src={block.settings?.channel_url}></iframe>
        ) : null}
        {block.settings.link_behavior?.includes("chat") ? (
          <iframe src={block.settings?.channel_chat}></iframe>
        ) : null}
      </Group>
    </div>
  )
}

export default TwitchPreview
