

import { Stack } from "@mantine/core"
import AudioPlayer from "../../ui/audio-player"

const CustomAudioPlayer = ({ block,className }) => {
  const audioUrl = block.settings.file_url


  return (
    <Stack className={className} style={{ borderRadius: "var(--mantine-radius-lg)" }} bg={"gray.0"} p="lg">
      <AudioPlayer name={block.settings.file_name} src={audioUrl} />
    </Stack>
  )
}

export default CustomAudioPlayer
