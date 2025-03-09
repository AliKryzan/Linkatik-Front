import { cn } from "@/lib/utils"

const Text = ({ block ,className}) => {
  return <a className={cn("link-preview default",className)}>{block.settings.content || "no content"}</a>
}

export default Text
