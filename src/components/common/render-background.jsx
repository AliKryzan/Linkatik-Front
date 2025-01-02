const RenderBackground = ({ encapsulated, style }) => {
  console.log("🚀 ~ RenderBackground ~ encapsulated:", encapsulated)
  return (
    <div
      key={Math.random()}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
      dangerouslySetInnerHTML={{
        __html: encapsulated,
      }}
    />
  )
}

export default RenderBackground
