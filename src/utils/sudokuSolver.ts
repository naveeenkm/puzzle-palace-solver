
// Sudoku puzzle is represented as a 9x9 grid
// 0 represents an empty cell
export type SudokuGrid = number[][];

// Create an empty 9x9 grid
export const createEmptyGrid = (): SudokuGrid => {
  return Array(9).fill(0).map(() => Array(9).fill(0));
};

// Checks if a number can be placed at a specific position
const isValid = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (grid[y][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      if (grid[y][x] === num) return false;
    }
  }

  return true;
};

// Solve the Sudoku puzzle using backtracking
export const solveSudoku = (grid: SudokuGrid): SudokuGrid | null => {
  const result = [...grid.map(row => [...row])];
  
  if (solve(result)) {
    return result;
  }
  
  return null; // No solution exists
};

// Helper function for the backtracking algorithm
const solve = (grid: SudokuGrid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            
            if (solve(grid)) {
              return true;
            }
            
            grid[row][col] = 0; // Backtrack
          }
        }
        return false; // No valid number found
      }
    }
  }
  return true; // All cells filled
};

// Validates if a cell's value is valid in its current position
export const isValidCell = (grid: SudokuGrid, row: number, col: number, value: number): boolean => {
  // Skip validation for empty cells
  if (value === 0) return true;
  
  // Temporarily remove the value to check if it would be valid
  const temp = grid[row][col];
  grid[row][col] = 0;
  
  const valid = isValid(grid, row, col, value);
  
  // Restore the original value
  grid[row][col] = temp;
  
  return valid;
};

// Validates the entire sudoku grid
export const isValidSudoku = (grid: SudokuGrid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value !== 0) {
        const temp = grid[row][col];
        grid[row][col] = 0;
        
        if (!isValid(grid, row, col, temp)) {
          grid[row][col] = temp;
          return false;
        }
        
        grid[row][col] = temp;
      }
    }
  }
  return true;
};

// Check if the puzzle is completely filled (no zeros)
export const isComplete = (grid: SudokuGrid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) return false;
    }
  }
  return true;
};

// Generate a sample puzzle (for testing)
export const generateSamplePuzzle = (): SudokuGrid => {
  return [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
};

// Create a deep copy of a grid
export const copyGrid = (grid: SudokuGrid): SudokuGrid => {
  return grid.map(row => [...row]);
};
