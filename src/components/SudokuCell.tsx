
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SudokuCellProps {
  value: number;
  row: number;
  col: number;
  isValid: boolean;
  isOriginal: boolean;
  isSolving: boolean;
  onValueChange: (row: number, col: number, value: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  row,
  col,
  isValid,
  isOriginal,
  isSolving,
  onValueChange,
}) => {
  const [animateValue, setAnimateValue] = useState(false);
  
  // Trigger animation when value changes
  useEffect(() => {
    if (value > 0) {
      setAnimateValue(true);
      const timer = setTimeout(() => setAnimateValue(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow only numbers 1-9 and delete/backspace
    if (isOriginal) return;
    
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      onValueChange(row, col, 0);
    } else if (/^[1-9]$/.test(e.key)) {
      onValueChange(row, col, parseInt(e.key));
    }
  };

  const handleClick = () => {
    if (isOriginal || isSolving) return;
    
    // Cycle through numbers 1-9 and then back to empty (0)
    const nextValue = value < 9 ? value + 1 : 0;
    onValueChange(row, col, nextValue);
  };

  return (
    <div
      className={cn(
        "sudoku-cell relative border border-gray-200 select-none",
        "transition-all duration-250 focus-within:bg-blue-50",
        "hover:bg-gray-50 active:bg-gray-100",
        {
          "bg-white": value === 0 && isValid,
          "bg-red-50": !isValid,
          "cursor-pointer": !isOriginal && !isSolving,
          "cursor-not-allowed": isOriginal || isSolving,
          "font-semibold": isOriginal,
          "text-black": isOriginal,
          "text-blue-600": !isOriginal && value > 0 && isValid,
          "text-red-500": !isValid,
        }
      )}
      onClick={handleClick}
      tabIndex={isOriginal ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}`}
    >
      <span 
        className={cn(
          "text-xl sm:text-2xl",
          { "number-pop": animateValue && !isOriginal }
        )}
      >
        {value > 0 ? value : ''}
      </span>
    </div>
  );
};

export default SudokuCell;
