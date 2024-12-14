const VideoPreview = ({ block }) => {
  return <video controls src={block.settings.file_url}></video>
}

export default VideoPreview
