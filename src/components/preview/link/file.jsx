import { FileText } from "lucide-react"

import { cn } from "@/lib/utils"

const FilePreview = ({ block, className, onClick }) => {
  return (
    <a
      onClick={onClick}
      className={cn("link-preview file", className)}
      download
      href={block.settings.file_url}
      target="_blank"
      rel="noopener noreferrer">
      <FileText />
      <span>{block.settings.file_name || "Untitled"}</span>
    </a>
  )
}

export default FilePreview
