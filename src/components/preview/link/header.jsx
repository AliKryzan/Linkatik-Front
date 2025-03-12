import { cn } from "@/lib/utils"

const HeaderPreview = ({ block, className, style }) => {
  if (block.settings.type === "small")
    return (
      <h4 className={cn("text-sm font-medium", className)} style={{ textAlign: "center", color: style.color }}>
        {block.title}
      </h4>
    )
  if (block.settings.type === "medium")
    return (
      <h3 className={cn("text-xl font-semibold", className)} style={{ textAlign: "center", color: style.color }}>
        {block.title}
      </h3>
    )
  return (
    <h2 className={cn("text-2xl font-bold", className)} style={{ textAlign: "center", color: style.color }}>
      {block.title}
    </h2>
  )
}

export default HeaderPreview
