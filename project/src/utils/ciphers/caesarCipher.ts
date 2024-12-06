export const caesarEncrypt = (text: string, shift: number): string => {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-zA-Z]/)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    })
    .join('');
};

export const caesarDecrypt = (text: string, shift: number): string => {
  return caesarEncrypt(text, 26 - (shift % 26));
};