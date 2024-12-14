import { FileText } from "lucide-react"

const FilePreview = ({ block }) => {
  return (
    <a
      className="link-preview file"
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
