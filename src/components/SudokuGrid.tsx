
import React, { useState, useEffect } from 'react';
import SudokuCell from './SudokuCell';
import { SudokuGrid as SudokuGridType, isValidCell } from '@/utils/sudokuSolver';

interface SudokuGridProps {
  grid: SudokuGridType;
  originalGrid: SudokuGridType;
  onCellChange: (row: number, col: number, value: number) => void;
  isSolving: boolean;
  isSolved: boolean;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  originalGrid,
  onCellChange,
  isSolving,
  isSolved,
}) => {
  const [staggeredCells, setStaggeredCells] = useState<boolean[][]>(
    Array(9).fill(false).map(() => Array(9).fill(false))
  );
  
  // Staggered entrance animation
  useEffect(() => {
    const newStaggered = Array(9).fill(false).map(() => Array(9).fill(false));
    
    const animateCells = async () => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          await new Promise(resolve => setTimeout(resolve, 7));
          newStaggered[i][j] = true;
          setStaggeredCells([...newStaggered]);
        }
      }
    };
    
    animateCells();
  }, []);

  return (
    <div className={`sudoku-grid max-w-[500px] w-full mx-auto border border-gray-300 rounded-lg ${isSolved ? 'solved-wave' : 'bg-white'} shadow-elevation-md`}>
      {grid.map((row, rowIndex) => (
        // Render each row
        row.map((cell, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            row={rowIndex}
            col={colIndex}
            isValid={isValidCell(grid, rowIndex, colIndex, cell)}
            isOriginal={originalGrid[rowIndex][colIndex] !== 0}
            isSolving={isSolving}
            onValueChange={onCellChange}
          />
        ))
      ))}
    </div>
  );
};

export default SudokuGrid;
