import { Divider } from "@mantine/core"

const DividerPreview = ({ block ,className}) => {
  return (
    <div
    className={className}
      style={{
        paddingTop: block.settings.margin_top + "px",
        paddingBottom: block.settings.margin_bottom + "px",
      }}>
      <Divider color={block.settings.color || "gray"} />
    </div>
  )
}

export default DividerPreview
