import { memo, useEffect, useState } from "react"

import Default from "./default"

const CustomLinkBehavior = ({ block }) => {
  if (block.type === "youtube") {
    console.log("🚀 ~ CustomLinkBehavior ~ block:", block)
  }
  const [htmlContent, setHtmlContent] = useState("")

  useEffect(() => {
    // extracting html text and parse it to html
    const htmlText = block.settings.html || block.settings.iframe
    if (!htmlText) return
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlText, "text/html")

    // removing width attribute from iframe
    const iframe = doc.querySelector("iframe")
    iframe?.setAttribute("width", "100%")

    // settings scripts
    const scripts = doc.querySelectorAll("script")
    for (const script of scripts) {
      script.remove()
      if (block.type === "telegram_post" || document.querySelector(`script[src='${script.src}']`)) continue
      const scriptElement = document.createElement("script")
      scriptElement.src = script.src
      scriptElement.async = true
      document.body.appendChild(scriptElement)
    }

    // using iframe for telegram
    if (block.type?.trim() === "telegram_post") {
      const telegramPost = document.createElement("iframe")
      telegramPost.src = `https://t.me/${block?.settings?.["telegram-post"]}?embed=1`
      telegramPost.width = "100%"
      telegramPost.height = "500px"
      doc.documentElement.appendChild(telegramPost)
    }
    // Convert the modified DOM back into an HTML string
    const modifiedHtml = doc.documentElement.innerHTML

    setHtmlContent(modifiedHtml)
  }, [block])

  if (block.settings.link_behavior === "target") return <Default block={block} />

  return (
    <div className="link-preview iframe">
      <p className="block-title">{block.title}</p>
      <div className="iframe-wrapper" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    </div>
  )
}

export default memo(CustomLinkBehavior)
