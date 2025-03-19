
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw, Play, Check, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ControlsProps {
  onSolve: () => void;
  onClear: () => void;
  onReset: () => void;
  onExample: () => void;
  isSolving: boolean;
  isSolved: boolean;
  isEmpty: boolean;
  isValid: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  onSolve,
  onClear,
  onReset,
  onExample,
  isSolving,
  isSolved,
  isEmpty,
  isValid
}) => {
  const handleSolve = () => {
    if (!isValid) {
      toast({
        title: "Invalid puzzle",
        description: "The current puzzle configuration has conflicts and cannot be solved.",
        variant: "destructive"
      });
      return;
    }
    
    if (!isEmpty) {
      onSolve();
    } else {
      toast({
        title: "Empty puzzle",
        description: "Please enter some numbers before solving.",
      });
    }
  };

  return (
    <div className="grid grid-cols-2 sm:flex space-y-0 gap-3 w-full max-w-md mx-auto my-6">
      <Button
        variant="outline"
        className={cn(
          "flex-1 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-subtle transition-all",
          "hover:shadow-elevation hover:border-gray-300 hover:bg-white"
        )}
        onClick={onExample}
        disabled={isSolving}
      >
        <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
        Example
      </Button>
      
      <Button
        variant="outline"
        className={cn(
          "flex-1 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-subtle transition-all",
          "hover:shadow-elevation hover:border-gray-300 hover:bg-white"
        )}
        onClick={onReset}
        disabled={isSolving || (isEmpty && !isSolved)}
      >
        <RotateCcw className="mr-2 h-4 w-4 text-amber-500" />
        Reset
      </Button>
      
      <Button
        className={cn(
          "flex-1 col-span-2 sm:col-span-1 transition-all",
          isSolved ? "bg-emerald-500 hover:bg-emerald-600" : "bg-blue-500 hover:bg-blue-600"
        )}
        onClick={handleSolve}
        disabled={isSolving || isSolved || !isValid}
      >
        {isSolving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Solving...
          </>
        ) : isSolved ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Solved!
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Solve
          </>
        )}
      </Button>
      
      <Button
        variant="outline"
        className={cn(
          "flex-1 col-span-2 sm:col-span-1 transition-all bg-white/90 backdrop-blur-sm",
          "border border-gray-200 shadow-subtle",
          "hover:shadow-elevation hover:border-gray-300 hover:bg-white"
        )}
        onClick={onClear}
        disabled={isSolving || isEmpty}
      >
        Clear
      </Button>
    </div>
  );
};

export default Controls;
