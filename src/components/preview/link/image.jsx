const ImagePreview = ({ block, className }) => {
  return (
    <div className={cn("link-preview image", className)}>
      <img src={block.settings.file_url} alt={block.settings.file_name} />
    </div>
  )
}

export default ImagePreview
