export const convertHtmlToText = (html: string) => {
  // TODO: Refine as a loop checking for different elements.
  const pIndex = html.indexOf('<p>');
  const lastPIndex = html.indexOf('</p>');
  let text = html.slice(0, 60).slice(pIndex + 3, lastPIndex);
  return text;
};
