import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = ({ value, setValue }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
    // eslint-disable-next-line
  }, [value]);

  return (
    <div className="border rounded min-h-[120px] p-2">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor; 