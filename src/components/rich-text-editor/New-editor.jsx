import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function NewEditor({ setValue }) {
    const editorRef = useRef(null);
  
    return (
      <Editor
        apiKey="p5qmq7h4h7yo8q5p4zy4xsbivlj4yqjco2i1z4ecpewdx06a"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={(content) => setValue(content)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins:
            "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
          toolbar:
            "undo redo | formatselect | bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    );
  }
export default NewEditor;
