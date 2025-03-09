const VideoPreview = ({ block,className }) => {
  return <video  className={className} controls src={block.settings.file_url}></video>
}

export default VideoPreview
