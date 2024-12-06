const createPlayfairMatrix = (key: string): string[][] => {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note: I and J are combined
  const matrix: string[][] = Array(5).fill(null).map(() => Array(5).fill(''));
  const usedChars = new Set();

  // First fill with key
  let row = 0;
  let col = 0;
  
  key.toUpperCase().replace(/J/g, 'I').split('').forEach(char => {
    if (!usedChars.has(char) && char.match(/[A-Z]/)) {
      matrix[row][col] = char;
      usedChars.add(char);
      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  });

  // Then fill with remaining alphabet
  alphabet.split('').forEach(char => {
    if (!usedChars.has(char)) {
      matrix[row][col] = char;
      col++;
      if (col === 5) {
        col = 0;
        row++;
      }
    }
  });

  return matrix;
};

const findPosition = (matrix: string[][], char: string): [number, number] => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

export const playfairEncrypt = (text: string, key: string): string => {
  const matrix = createPlayfairMatrix(key);
  const prepared = text
    .toUpperCase()
    .replace(/J/g, 'I')
    .replace(/[^A-Z]/g, '')
    .match(/.{1,2}/g)
    ?.map(pair => pair.length === 1 ? pair + 'X' : pair) || [];

  return prepared.map(pair => {
    const [row1, col1] = findPosition(matrix, pair[0]);
    const [row2, col2] = findPosition(matrix, pair[1]);

    if (row1 === row2) {
      return matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      return matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
    } else {
      return matrix[row1][col2] + matrix[row2][col1];
    }
  }).join('');
};

export const playfairDecrypt = (text: string, key: string): string => {
  const matrix = createPlayfairMatrix(key);
  const pairs = text.match(/.{1,2}/g) || [];

  return pairs.map(pair => {
    const [row1, col1] = findPosition(matrix, pair[0]);
    const [row2, col2] = findPosition(matrix, pair[1]);

    if (row1 === row2) {
      return matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
    } else if (col1 === col2) {
      return matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
    } else {
      return matrix[row1][col2] + matrix[row2][col1];
    }
  }).join('');
};