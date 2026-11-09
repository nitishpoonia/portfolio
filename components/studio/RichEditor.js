"use client";
import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import { TextSelection } from "@tiptap/pm/state";
import {
  Heading2, Heading3, Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote,
  SquareCode, Link2, ImagePlus, Minus, Undo2, Redo2, Type,
} from "lucide-react";
import { uploadImage, altFromName } from "./upload";

function Btn({ on, active, children, label, disabled }) {
  return (
    <button type="button" aria-label={label} title={label} aria-pressed={active === undefined ? undefined : !!active}
      onClick={on} disabled={disabled}
      className={`inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full px-2.5 text-sm disabled:opacity-30 ${active ? "bg-[#0A0A0A] text-white" : "hover:bg-black/10"}`}>
      {children}
    </button>
  );
}

// Insert an image after the block that holds the cursor (or at a drop point),
// followed by an empty paragraph with the cursor in it, so typing carries on
// below the image instead of replacing it or splitting a paragraph.
function insertImage(ed, attrs, pos) {
  const { state, view } = ed;
  const { schema, doc, selection } = state;
  const $at = doc.resolve(pos ?? selection.to);
  const at = selection.node && pos == null ? selection.to : $at.depth > 0 ? $at.after(1) : $at.pos;
  const image = schema.nodes.image.create(attrs);
  const next = doc.resolve(at).nodeAfter;
  const reuse = next?.type.name === "paragraph" && next.content.size === 0;
  const tr = state.tr.insert(at, reuse ? image : [image, schema.nodes.paragraph.create()]);
  tr.setSelection(TextSelection.create(tr.doc, at + image.nodeSize + 1)).scrollIntoView();
  view.dispatch(tr);
  view.focus();
}

const Sep = () => <span aria-hidden="true" className="mx-0.5 my-2 w-px bg-black/10" />;
const I = { size: 17, strokeWidth: 1.9, "aria-hidden": true };

// The editor reads and writes Markdown, so the public pages keep rendering
// the saved text with next-mdx-remote exactly as before.
// Images can be added with the button, pasted, or dropped in; they're resized
// and uploaded to /media.
export default function RichEditor({ value, onChange, onReady }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(0);
  const [err, setErr] = useState("");
  const editorRef = useRef(null);

  async function insertFiles(files, pos) {
    const images = [...files].filter((f) => f.type.startsWith("image/"));
    if (!images.length) return false;
    setErr("");
    for (const file of images) {
      setUploading((n) => n + 1);
      try {
        const src = await uploadImage(file);
        insertImage(editorRef.current, { src, alt: altFromName(file.name) }, pos);
        pos = null;
      } catch (e) {
        setErr(`${file.name}: ${e.message}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
    return true;
  }

  const editor = useEditor({
    immediatelyRender: false,
    // Re-render on selection changes so toolbar states (bold, Alt…) stay current
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Start writing… paste or drop images anywhere." }),
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose-studio min-h-[50vh] pb-10 text-[17px] outline-none",
        "aria-label": "Content",
      },
      handlePaste: (_view, event) => {
        const files = event.clipboardData?.files;
        if (files?.length && [...files].some((f) => f.type.startsWith("image/"))) {
          insertFiles(files);
          return true;
        }
        return false;
      },
      handleDrop: (view, event, _slice, moved) => {
        const files = event.dataTransfer?.files;
        if (moved || !files?.length) return false;
        const at = view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (![...files].some((f) => f.type.startsWith("image/"))) return false;
        event.preventDefault();
        insertFiles(files, at?.pos);
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.storage.markdown.getMarkdown()),
  });
  editorRef.current = editor;

  useEffect(() => {
    if (editor) onReady?.(editor);
  }, [editor, onReady]);

  // Follow outside changes to `value` (e.g. restoring unsaved work), without
  // fighting the user's own typing, which already matches.
  useEffect(() => {
    if (editor && value !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const c = () => editor.chain().focus();
  const imageSelected = editor.isActive("image");

  return (
    <div>
      <div className="sticky top-[72px] z-10 -mx-2 mb-4 flex overflow-x-auto rounded-[22px] border border-black/[.08] bg-white/95 p-1 shadow-[0_4px_16px_rgba(10,10,10,0.06)] backdrop-blur-xl [scrollbar-width:none] md:-mx-3 md:flex-wrap [&>*]:shrink-0" role="toolbar" aria-label="Formatting">
        <Btn label="Undo (Ctrl+Z)" on={() => c().undo().run()} disabled={!editor.can().undo()}><Undo2 {...I} /></Btn>
        <Btn label="Redo (Ctrl+Shift+Z)" on={() => c().redo().run()} disabled={!editor.can().redo()}><Redo2 {...I} /></Btn>
        <Sep />
        <Btn label="Paragraph" active={editor.isActive("paragraph")} on={() => c().setParagraph().run()}><Type {...I} /></Btn>
        <Btn label="Heading 2" active={editor.isActive("heading", { level: 2 })} on={() => c().toggleHeading({ level: 2 }).run()}><Heading2 {...I} /></Btn>
        <Btn label="Heading 3" active={editor.isActive("heading", { level: 3 })} on={() => c().toggleHeading({ level: 3 }).run()}><Heading3 {...I} /></Btn>
        <Sep />
        <Btn label="Bold (Ctrl+B)" active={editor.isActive("bold")} on={() => c().toggleBold().run()}><Bold {...I} /></Btn>
        <Btn label="Italic (Ctrl+I)" active={editor.isActive("italic")} on={() => c().toggleItalic().run()}><Italic {...I} /></Btn>
        <Btn label="Strikethrough" active={editor.isActive("strike")} on={() => c().toggleStrike().run()}><Strikethrough {...I} /></Btn>
        <Btn label="Inline code" active={editor.isActive("code")} on={() => c().toggleCode().run()}><Code {...I} /></Btn>
        <Sep />
        <Btn label="Bullet list" active={editor.isActive("bulletList")} on={() => c().toggleBulletList().run()}><List {...I} /></Btn>
        <Btn label="Numbered list" active={editor.isActive("orderedList")} on={() => c().toggleOrderedList().run()}><ListOrdered {...I} /></Btn>
        <Btn label="Quote" active={editor.isActive("blockquote")} on={() => c().toggleBlockquote().run()}><Quote {...I} /></Btn>
        <Btn label="Code block" active={editor.isActive("codeBlock")} on={() => c().toggleCodeBlock().run()}><SquareCode {...I} /></Btn>
        <Sep />
        <Btn label="Link" active={editor.isActive("link")} on={() => {
          const url = window.prompt("Link URL (empty to remove)", editor.getAttributes("link").href || "https://");
          if (url === null) return;
          url && url !== "https://" ? c().extendMarkRange("link").setLink({ href: url }).run() : c().extendMarkRange("link").unsetLink().run();
        }}><Link2 {...I} /></Btn>
        <Btn label="Upload image" on={() => fileRef.current?.click()} disabled={uploading > 0}><ImagePlus {...I} /></Btn>
        {imageSelected && (
          <Btn label="Edit image alt text" on={() => {
            const alt = window.prompt("Describe the image (alt text)", editor.getAttributes("image").alt || "");
            if (alt !== null) c().updateAttributes("image", { alt }).run();
          }}><span className="text-xs font-medium">Alt</span></Btn>
        )}
        <Btn label="Divider" on={() => c().setHorizontalRule().run()}><Minus {...I} /></Btn>
        <span role="status" className="flex items-center px-2 text-xs text-[#55555A]">
          {uploading > 0 ? `Uploading ${uploading} image${uploading > 1 ? "s" : ""}…` : ""}
        </span>
      </div>
      {err && <p role="alert" className="mb-2 px-2 text-sm text-red-700">{err}</p>}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple hidden
        onChange={(e) => { insertFiles(e.target.files); e.target.value = ""; }} />
      <EditorContent editor={editor} />
    </div>
  );
}
