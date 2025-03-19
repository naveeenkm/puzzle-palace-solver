
import React, { useState, useEffect } from 'react';
import SudokuGrid from '@/components/SudokuGrid';
import Controls from '@/components/Controls';
import { 
  createEmptyGrid, 
  solveSudoku, 
  generateSamplePuzzle, 
  copyGrid, 
  isValidSudoku,
  isComplete,
  SudokuGrid as SudokuGridType
} from '@/utils/sudokuSolver';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [grid, setGrid] = useState<SudokuGridType>(createEmptyGrid());
  const [originalGrid, setOriginalGrid] = useState<SudokuGridType>(createEmptyGrid());
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();
  
  // Validate grid whenever it changes
  useEffect(() => {
    const valid = isValidSudoku(copyGrid(grid));
    setIsValid(valid);
    
    // Check if puzzle is solved
    if (isComplete(grid) && valid) {
      setIsSolved(true);
    } else {
      setIsSolved(false);
    }
  }, [grid]);
  
  const handleCellChange = (row: number, col: number, value: number) => {
    // Prevent changing original cells
    if (originalGrid[row][col] !== 0) return;
    
    const newGrid = copyGrid(grid);
    newGrid[row][col] = value;
    setGrid(newGrid);
  };
  
  const handleSolve = async () => {
    setIsSolving(true);
    
    // Small delay to show solving state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const solution = solveSudoku(copyGrid(grid));
    
    if (solution) {
      setGrid(solution);
      setIsSolved(true);
      toast({
        title: "Puzzle solved!",
        description: "The solution has been found.",
      });
    } else {
      toast({
        title: "No solution exists",
        description: "This puzzle cannot be solved with the current configuration.",
        variant: "destructive"
      });
    }
    
    setIsSolving(false);
  };
  
  const handleClear = () => {
    setGrid(createEmptyGrid());
    setOriginalGrid(createEmptyGrid());
    setIsSolved(false);
  };
  
  const handleReset = () => {
    setGrid(copyGrid(originalGrid));
    setIsSolved(false);
  };
  
  const handleExample = () => {
    const examplePuzzle = generateSamplePuzzle();
    setGrid(copyGrid(examplePuzzle));
    setOriginalGrid(copyGrid(examplePuzzle));
    setIsSolved(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container max-w-3xl px-4 py-12 mx-auto">
        <div className="text-center mb-8 animate-slide-down">
          <span className="px-3 py-1 text-xs font-medium text-blue-600 rounded-full bg-blue-50 mb-2 inline-block">
            Elegant Puzzle Solver
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-2">
            Sudoku Solver
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Enter your puzzle or try an example. Click on empty cells to input numbers, then solve with a single click.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:p-6"
        >
          <SudokuGrid 
            grid={grid}
            originalGrid={originalGrid}
            onCellChange={handleCellChange}
            isSolving={isSolving}
            isSolved={isSolved}
          />
          
          <Controls 
            onSolve={handleSolve}
            onClear={handleClear}
            onReset={handleReset}
            onExample={handleExample}
            isSolving={isSolving}
            isSolved={isSolved}
            isEmpty={grid.every(row => row.every(cell => cell === 0))}
            isValid={isValid}
          />
          
          <div className="text-center text-xs text-gray-400 mt-8">
            <p>Click cells to input numbers or use keyboard. Press solve when ready.</p>
            <p className="mt-1">Invalid inputs will be highlighted in red.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
