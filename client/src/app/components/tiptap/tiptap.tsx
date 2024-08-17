'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './tiptap.styles.css';
const Tiptap = (props: {
  description: string;
  onChange: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: props.description,
    onUpdate({ editor }) {
      props.onChange(editor.getHTML());
    },
  });

  return <EditorContent className='border p-4' editor={editor} />;
};

export default Tiptap;
