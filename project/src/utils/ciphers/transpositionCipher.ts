export const transpositionEncrypt = (text: string, key: number): string => {
  const rows = Math.ceil(text.length / key);
  const matrix: string[][] = Array(rows).fill('').map(() => Array(key).fill(''));
  let index = 0;

  // Fill matrix
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < key; j++) {
      matrix[i][j] = index < text.length ? text[index] : '';
      index++;
    }
  }

  // Read by columns
  let result = '';
  for (let j = 0; j < key; j++) {
    for (let i = 0; i < rows; i++) {
      if (matrix[i][j]) {
        result += matrix[i][j];
      }
    }
  }

  return result;
};

export const transpositionDecrypt = (text: string, key: number): string => {
  const rows = Math.ceil(text.length / key);
  const matrix: string[][] = Array(rows).fill('').map(() => Array(key).fill(''));
  const lastRowFill = text.length % key || key;
  let index = 0;

  // Fill matrix by columns
  for (let j = 0; j < key; j++) {
    const colSize = j < lastRowFill ? rows : rows - 1;
    for (let i = 0; i < colSize; i++) {
      matrix[i][j] = text[index++];
    }
  }

  // Read by rows
  let result = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < key; j++) {
      if (matrix[i][j]) {
        result += matrix[i][j];
      }
    }
  }

  return result;
};