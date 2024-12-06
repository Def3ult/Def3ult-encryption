export const vigenereEncrypt = (text: string, key: string): string => {
  const keyRepeated = key
    .toUpperCase()
    .repeat(Math.ceil(text.length / key.length))
    .slice(0, text.length);

  return text
    .toUpperCase()
    .split('')
    .map((char, i) => {
      if (char.match(/[A-Z]/)) {
        const shift = keyRepeated[i].charCodeAt(0) - 65;
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    })
    .join('');
};

export const vigenereDecrypt = (text: string, key: string): string => {
  const keyRepeated = key
    .toUpperCase()
    .repeat(Math.ceil(text.length / key.length))
    .slice(0, text.length);

  return text
    .toUpperCase()
    .split('')
    .map((char, i) => {
      if (char.match(/[A-Z]/)) {
        const shift = keyRepeated[i].charCodeAt(0) - 65;
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      }
      return char;
    })
    .join('');
};