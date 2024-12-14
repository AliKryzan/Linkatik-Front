import { useState } from "react"
import { Button, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react"
import { useParams } from "react-router-dom"

import { GetPageAppearance } from "../../../services/utils"
import AutoHeight from "../../common/auto-height"

function FaqPreview({ block }) {
  const { path } = useParams()
  const { data } = useQuery({
    queryKey: ["bio-page-theme-preview", path],
    queryFn: () => GetPageAppearance(path),
    staleTime: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  const theme = data?.appearance?.bio_link
  // See groceries data above
  // const items = block.settings.faqs.map((item, index) => (
  //   <Accordion.Item key={item.question} value={index + ""}>
  //     <Accordion.Control
  //       style={{
  //         borderRadius: `var(--mantine-radius-${theme?.radius || "xl"}})`,
  //       }}
  //       bg={theme?.color || "#fcf3d8"}>
  //       {item.question}
  //     </Accordion.Control>
  //     <Accordion.Panel>
  //       <div style={{ whiteSpace: "wrap", maxWidth: "330px" }}>{item.answer}</div>
  //     </Accordion.Panel>
  //   </Accordion.Item>
  // ))
  const [opened, setOpened] = useState(null)

  return (
    <div className="faq-preview">
      <Stack>
        {block.settings.faqs.map((item, index) => {
          return (
            <div key={index}>
              <Button
                onClick={() => {
                  setOpened(opened === index ? null : index)
                }}
                leftSection={<span></span>}
                rightSection={<ChevronDown strokeWidth={1.3} />}
                justify="space-between"
                autoContrast
                size={theme?.size || "md"}
                radius={theme?.radius || "xl"}
                variant={theme?.variant || "filled"}
                color={theme?.color || "#fcf3d8"}
                style={{ boxShadow: theme?.shadow }}
                className="link-preview default">
                {item.question}
              </Button>
              <AutoHeight>
                {opened === index && (
                  <div className="faq-answer">
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

      {/* <Accordion
        variant="separated"
        classNames={{
          root: "faq-root",
          control: "link-preview faq",
          item: "faq-item",
          panel: "faq-panel",
        }}
        defaultValue="Apples">
        {items}
      </Accordion> */}
    </div>
  )
}
export default FaqPreview
