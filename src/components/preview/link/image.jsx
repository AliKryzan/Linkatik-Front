const ImagePreview = ({ block }) => {
  return (
    <div className="link-preview image">
      <img src={block.settings.file_url} alt={block.settings.file_name} />
    </div>
  )
}

export default ImagePreview
