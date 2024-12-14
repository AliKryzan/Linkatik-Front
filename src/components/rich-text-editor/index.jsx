import { RichTextEditor } from "@mantine/tiptap"
import { BubbleMenu, useEditorState } from "@tiptap/react"

import "@mantine/tiptap/styles.css"

function RichTextEditorComponent({ editor, field }) {
  useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrike: ctx.editor.isActive("strike"),
      isUnderLine: ctx.editor.isActive("underline"),
      isCode: ctx.editor.isActive("code"),
      heading1: ctx.editor.isActive("heading", { level: 1 }),
      heading2: ctx.editor.isActive("heading", { level: 2 }),
      heading3: ctx.editor.isActive("heading", { level: 3 }),
      heading4: ctx.editor.isActive("heading", { level: 4 }),
      heading5: ctx.editor.isActive("heading", { level: 5 }),
      heading6: ctx.editor.isActive("heading", { level: 6 }),
      bulletList: ctx.editor.isActive("bulletList"),
      orderedList: ctx.editor.isActive("orderedList"),
    }),

    equalityFn: (prev, next) => {
      // A deep-equal function would probably be more maintainable here, but, we use a shallow one to show that it can be customized.
      if (!next) {
        return false
      }
      return (
        prev.isBold === next.isBold &&
        prev.isItalic === next.isItalic &&
        prev.isStrike === next.isStrike &&
        prev.isUnderLine === next.isUnderLine &&
        prev.isCode === next.isCode &&
        prev.heading1 === next.heading1 &&
        prev.heading2 === next.heading2 &&
        prev.heading3 === next.heading3 &&
        prev.heading4 === next.heading4 &&
        prev.heading5 === next.heading5 &&
        prev.heading6 === next.heading6 &&
        prev.bulletList === next.bulletList &&
        prev.orderedList === next.orderedList
      )
    },
  })
  if (!editor) {
    return null
  }
  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar dir="ltr" sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <BubbleMenu editor={editor}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
          <RichTextEditor.Link />
        </RichTextEditor.ControlsGroup>
      </BubbleMenu>
      <div>
        <RichTextEditor.Content {...field} mih={"300"} />
      </div>
    </RichTextEditor>
  )
}

export default RichTextEditorComponent
