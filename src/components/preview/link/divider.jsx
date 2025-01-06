import { Divider } from "@mantine/core"

const DividerPreview = ({ block }) => {
  return (
    <div
      style={{
        paddingTop: block.settings.margin_top + "px",
        paddingBottom: block.settings.margin_bottom + "px",
      }}>
      <Divider color={block.settings.color || "gray"} />
    </div>
  )
}

export default DividerPreview
