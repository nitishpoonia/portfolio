"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";

function Btn({ on, active, children, label }) {
  return (
  <button type="button" aria-label={label} aria-pressed={!!active} onClick={on}
    className={`min-h-[40px] min-w-[40px] rounded-full px-3 text-sm ${active ? "bg-[#0A0A0A] text-white" : "hover:bg-black/10"}`}>
    {children}
  </button>
  );
}

// The editor reads and writes Markdown, so the public pages keep rendering
// the saved text with next-mdx-remote exactly as before.
export default function RichEditor({ value, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Start writing…" }),
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose-studio min-h-[320px] rounded-[22px] border border-black/15 bg-white/70 px-5 py-4 outline-none focus:border-black",
        "aria-label": "Content",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.storage.markdown.getMarkdown()),
  });

  if (!editor) return null;

  const c = () => editor.chain().focus();

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1 rounded-full border border-white/90 bg-white/60 p-1 backdrop-blur-xl">
        <Btn label="Heading 2" active={editor.isActive("heading", { level: 2 })} on={() => c().toggleHeading({ level: 2 }).run()}>H2</Btn>
        <Btn label="Heading 3" active={editor.isActive("heading", { level: 3 })} on={() => c().toggleHeading({ level: 3 }).run()}>H3</Btn>
        <Btn label="Bold" active={editor.isActive("bold")} on={() => c().toggleBold().run()}><b>B</b></Btn>
        <Btn label="Italic" active={editor.isActive("italic")} on={() => c().toggleItalic().run()}><i>I</i></Btn>
        <Btn label="Inline code" active={editor.isActive("code")} on={() => c().toggleCode().run()}>{"</>"}</Btn>
        <Btn label="Bullet list" active={editor.isActive("bulletList")} on={() => c().toggleBulletList().run()}>• List</Btn>
        <Btn label="Numbered list" active={editor.isActive("orderedList")} on={() => c().toggleOrderedList().run()}>1. List</Btn>
        <Btn label="Quote" active={editor.isActive("blockquote")} on={() => c().toggleBlockquote().run()}>Quote</Btn>
        <Btn label="Code block" active={editor.isActive("codeBlock")} on={() => c().toggleCodeBlock().run()}>Code</Btn>
        <Btn label="Link" active={editor.isActive("link")} on={() => {
          const url = window.prompt("Link URL (empty to remove)", editor.getAttributes("link").href || "");
          if (url === null) return;
          url ? c().setLink({ href: url }).run() : c().unsetLink().run();
        }}>Link</Btn>
        <Btn label="Image" on={() => {
          const src = window.prompt("Image URL");
          if (src) c().setImage({ src }).run();
        }}>Image</Btn>
        <Btn label="Divider" on={() => c().setHorizontalRule().run()}>—</Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
