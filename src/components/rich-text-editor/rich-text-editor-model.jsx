import { useEffect } from "react"
import { Button, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Link } from "@mantine/tiptap"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import RichTextEditorComponent from "."
import NewEditor from "./New-editor"


const RichTextEditorModal = ({ label, field, setValue, error }) => {
  const [opened, { open, close }] = useDisclosure(false)
  const editor = useEditor({
    shouldRerenderOnTransaction: false,
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"], defaultAlignment: "" }),
    ],
    content: "",
  })

  useEffect(() => {
    // Update form when editor content changes
    if (editor) {
      editor.on("blur", () => {
        setValue(editor.getHTML())
      })
    }
  }, [editor, setValue])


  return (
    <div>
      <Button radius={"sm"} onClick={open}>
        {label}
      </Button>{" "}
      {error && (
        <Text pb="md" c={"red"} size="sm">
          {error}
        </Text>
      )}
      <Modal size="xl" centered opened={opened} onClose={close} title={label}>
        <RichTextEditorComponent field={field} editor={editor} />
        {/* <NewEditor setValue={setValue} /> */}
      </Modal>
    </div>
  )
}

export default RichTextEditorModal











