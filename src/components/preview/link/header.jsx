const HeaderPreview = ({ block, className }) => {
  if (block.settings.type === "small")
    return (
      <h4 className={className} style={{ textAlign: "center" }}>
        {block.title}
      </h4>
    )
  if (block.settings.type === "medium")
    return (
      <h3 className={className} style={{ textAlign: "center" }}>
        {block.title}
      </h3>
    )
  return (
    <h2 className={className} style={{ textAlign: "center" }}>
      {block.title}
    </h2>
  )
}

export default HeaderPreview
