'use client';

import DOMPurify from 'dompurify';

type Props = {
  content: string;
  className?: string;
};

const createMarkup = (content: string) => {
  return { __html: DOMPurify.sanitize(content.slice(0, 40)) };
};

const RenderHTML = ({ content, className }: Props) => (
  <div className={className} dangerouslySetInnerHTML={createMarkup(content)} />
);

export default RenderHTML;
