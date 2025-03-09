import { useState } from "react"
import { GetPageAppearance } from "@/services/utils"
import { Stack, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react"
import { useParams } from "react-router-dom"

import { cn } from "@/lib/utils"

import AutoHeight from "../../common/auto-height"
import { Buttons } from "./buttons"

function FaqPreview({ block, className, style }) {
  const { path } = useParams()
  const { data } = useQuery({
    queryKey: ["bio-page-theme-preview", path],
    queryFn: () => GetPageAppearance(path),
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const theme = data?.appearance?.bio_link

  const Button = Buttons[theme.type ?? "filled"]
  const buttonColor = theme.button_color ?? `#fcf3d8`
  const textColor = theme.text_color ?? `#000000`
  const [opened, setOpened] = useState(null)

  return (
    <div className={cn("faq-preview", className)}>
      <Stack>
        {block.settings.faqs.map((item, index) => {
          return (
            <div key={index}>
              <Button
                style={style}
                className="link-preview default"
                onClick={() => {
                  setOpened(opened === index ? null : index)
                }}
                {...(block.url ? { href: block.url, rel: "noopener noreferrer" } : { component: "button" })}>
                <div className="button-inner !justify-between">
                  <Text lineClamp={1}>{item.question || "Untitled"}</Text>
                  <ChevronDown strokeWidth={1.3} />
                </div>
              </Button>
              <AutoHeight>
                {opened === index && (
                  <div className="faq-answer" style={style}>
                    <p
                      style={{
                        borderRadius: `0 0 var(--mantine-radius-${theme?.radius || "xl"}) var(--mantine-radius-${theme?.radius || "xl"})`,
                        boxShadow: theme?.shadow,
                      }}>
                      <span>{item.question}</span>
                      {item.answer}
                    </p>
                  </div>
                )}
              </AutoHeight>
            </div>
          )
        })}
      </Stack>
    </div>
  )
}
export default FaqPreview
