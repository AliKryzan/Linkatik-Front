const VideoPreview = ({ block,className ,style}) => {
  return <video style={style} className={className} controls src={block.settings.file_url}></video>
}

export default VideoPreview
