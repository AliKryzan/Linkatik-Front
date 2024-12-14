import { useRef, useState } from "react"
import { ActionIcon, Group, Slider, Stack, Text } from "@mantine/core"
import { useForceUpdate } from "@mantine/hooks"
import { Pause, Play } from "lucide-react"

const AudioPlayer = ({ src, name }) => {
  const audioUrl = src
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleTimeChange = (value) => {
    audioRef.current.currentTime = value
    setCurrentTime(value)
  }
  const forceUpdate = useForceUpdate()

  return (
    <Stack gap={"xs"} mt={"md"}>
      <audio onLoadedMetadata={forceUpdate} ref={audioRef} src={audioUrl} onTimeUpdate={updateCurrentTime} />
      {name ? (
        <div className="marquee-container">
          <div className="marquee">
            <Text>{name}</Text>
          </div>
        </div>
      ) : null}

      <Slider
        thumbSize={18}
        size={4}
        value={currentTime}
        onChange={handleTimeChange}
        color="black"
        max={audioRef.current?.duration || 100}
        label={(value) => `${Math.floor(value / 60)}:${Math.floor(value % 60)}`}
        mt="sm"
      />
      <Group justify="space-between">
        <Text>
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
        </Text>
        <Text>
          {`${Math.floor(audioRef.current?.duration / 60)}:${Math.floor(audioRef.current?.duration % 60)}`}
        </Text>
      </Group>

      <Group justify="center">
        {/* <ActionIcon
          size={"xl"}
          radius={"xl"}
          variant="subtle"
          onClick={() => handleVolumeChange(volume === 0 ? 100 : 0)}>
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </ActionIcon> */}
        <ActionIcon size={"xl"} radius={"xl"} onClick={togglePlayPause} variant="transparent">
          {isPlaying ? <Pause color="black" size={26} /> : <Play color="black" size={26} />}
        </ActionIcon>
        {/* <div style={{ width: 50 }}></div> */}

        {/* 
          <Slider
            size={2}
            value={volume}
            onChange={handleVolumeChange}
            label={(value) => `${value}%`}
            max={100}
            style={{ width: 150 }}
          /> */}
      </Group>
    </Stack>
  )
}

export default AudioPlayer
