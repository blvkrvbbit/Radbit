export const adjustImage = (height: number, width: number, url: string) => {
  return (
    url.slice(0, url.indexOf('upload/') + 7) +
    `c_fill,$h_${height}/` +
    url.slice(url.indexOf('upload/') + 7, url.length)
  );
};
