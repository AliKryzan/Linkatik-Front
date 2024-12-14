const Text = ({ block }) => {
  return <a className="link-preview default">{block.settings.content || "no content"}</a>
}

export default Text
