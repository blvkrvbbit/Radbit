export const formatMoneyToString = (amount: number) => {
  const pos = [
    [0, 1], // length === 4
    [0, 2], // length === 5
    [0, 3], // length === 6
    [0, 1, 4], // length === 7
    [0, 2, 5], // length === 8
    [0, 3, 6], // length === 9
  ];
  let format = `${amount}`;
  // loop through 6 times
  if (format.length >= 4) {
    for (let i = 0, maxLength = 4; i < 6; i++, maxLength++) {
      if (format.length === maxLength) {
        console.log(maxLength);
        return addComma(pos[i], format);
      }
    }
  }
  return format;
};

const addComma = (pos: number[], str: string) => {
  if (pos.length === 3) {
    return (
      str.slice(pos[0], pos[1]) +
      ',' +
      str.slice(pos[1], pos[2]) +
      ',' +
      str.slice(pos[2], str.length)
    );
  }
  return str.slice(pos[0], pos[1]) + ',' + str.slice(pos[1], str.length);
};
