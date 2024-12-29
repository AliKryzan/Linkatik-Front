const RenderBackground = ({ encapsulated }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      dangerouslySetInnerHTML={{
        __html: encapsulated,
      }}
    />
  )
}

export default RenderBackground
