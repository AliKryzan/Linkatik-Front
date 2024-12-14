const HeaderPreview = ({ block }) => {
  if (block.settings.type === "small") return <h4>{block.title}</h4>
  if (block.settings.type === "medium") return <h3>{block.title}</h3>
  return <h2>{block.title}</h2>
}

export default HeaderPreview
