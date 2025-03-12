import { useState } from "react"

const VideoPreview = ({ block, className, style, onClick }) => {
  const [showVideo, setShowVideo] = useState(false)
  
  const handleThumbnailClick = (e) => {
    setShowVideo(true)
    if (onClick) onClick(e)
  }

  const thumbnailUrl = block.image

  return (
    <div className={`${className} w-full max-w-full`} style={style}>
      {!showVideo && thumbnailUrl ? (
        <div className="video-thumbnail-container relative !rounded-lg w-full overflow-hidden aspect-video" onClick={handleThumbnailClick}>
          <img 
            src={thumbnailUrl} 
            alt="Video thumbnail" 
            className="video-thumbnail w-full h-full object-cover" 
          />
          <div className="play-button-overlay animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video">
          <video
            onClick={onClick}
            style={style}
            className={`${className} w-full h-full object-contain`}
            controls
            src={block.settings.file_url}></video>
        </div>
      )}
    </div>
  )
}

export default VideoPreview
