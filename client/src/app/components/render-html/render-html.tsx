'use client';
import DOMPurify from 'isomorphic-dompurify';
import { useEffect, useState } from 'react';

type Props = {
  content: string;
  className?: string;
};

const createMarkup = (content: string) => {
  return { __html: DOMPurify.sanitize(content) };
};

const RenderHTML = ({ content, className }: Props) => {
  const [styledContent, setStyledContent] = useState<string>('');
  useEffect(() => {
    // TODO: Add more styling for rendered html
    let html = content;
    setStyledContent(html.replaceAll('<p', '<p class="mb-4"'));
  }, [content]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={createMarkup(styledContent)}
    />
  );
};

export default RenderHTML;
