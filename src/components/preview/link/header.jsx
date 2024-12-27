const HeaderPreview = ({ block }) => {
  if (block.settings.type === "small") return <h4 style={{ textAlign: "center" }}>{block.title}</h4>
  if (block.settings.type === "medium") return <h3 style={{ textAlign: "center" }}>{block.title}</h3>
  return <h2 style={{ textAlign: "center" }}>{block.title}</h2>
}

export default HeaderPreview
