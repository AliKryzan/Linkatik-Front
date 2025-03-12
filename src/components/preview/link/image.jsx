import { cn } from "@/lib/utils"

const ImagePreview = ({ block, className,onClick }) => {
  return (
    <div onClick={onClick} className={cn("link-preview image", className)}>
      <img src={block.settings.file_url} alt={block.settings.file_name} />
    </div>
  )
}

export default ImagePreview
