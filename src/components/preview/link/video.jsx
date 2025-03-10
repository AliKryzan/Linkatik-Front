const VideoPreview = ({ block, className, style, onClick }) => {
  return (
    <video
      onClick={onClick}
      style={style}
      className={className}
      controls
      src={block.settings.file_url}></video>
  )
}

export default VideoPreview
