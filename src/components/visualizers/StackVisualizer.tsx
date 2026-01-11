import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Eye, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { AnimationControls } from '@/components/common/AnimationControls';
import { CodeViewer } from '@/components/common/CodeViewer';
import { stackCodeExamples } from '@/data/codeExamples';
import { useAnimation } from '@/hooks/useAnimation';

interface StackElement {
  id: number;
  value: number;
}

export const StackVisualizer = () => {
  const [stack, setStack] = useState<StackElement[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [maxCapacity] = useState(10);
  const [peekingIndex, setPeekingIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [nextId, setNextId] = useState(0);
  const animation = useAnimation();

  const showMessage = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2000);
  };

  const push = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      showMessage('Please enter a valid number', 'error');
      return;
    }
    if (stack.length >= maxCapacity) {
      showMessage('Stack Overflow! Maximum capacity reached', 'error');
      return;
    }
    setStack([...stack, { id: nextId, value }]);
    setNextId(nextId + 1);
    setInputValue('');
    showMessage(`Pushed ${value} to stack`, 'success');
  };

  const pop = () => {
    if (stack.length === 0) {
      showMessage('Stack Underflow! Stack is empty', 'error');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    showMessage(`Popped ${popped.value} from stack`, 'success');
  };

  const peek = () => {
    if (stack.length === 0) {
      showMessage('Stack is empty!', 'error');
      return;
    }
    setPeekingIndex(stack.length - 1);
    showMessage(`Top element: ${stack[stack.length - 1].value}`, 'info');
    setTimeout(() => setPeekingIndex(null), 1500);
  };

  const clear = () => {
    setStack([]);
    showMessage('Stack cleared', 'info');
  };

  const fillPercentage = (stack.length / maxCapacity) * 100;
  const fillColor = fillPercentage > 80 ? 'bg-destructive' : fillPercentage > 50 ? 'bg-searching' : 'bg-dataStructure';

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && push()}
            className="w-32"
          />
          <Button onClick={push} className="gap-2 gradient-data-structure text-white border-0">
            <Plus className="h-4 w-4" />
            Push
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={pop} className="gap-2">
            <Minus className="h-4 w-4" />
            Pop
          </Button>
          <Button variant="outline" onClick={peek} className="gap-2">
            <Eye className="h-4 w-4" />
            Peek
          </Button>
          <Button variant="outline" onClick={clear} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>

        <div className="ml-auto">
          <CodeViewer examples={stackCodeExamples} />
        </div>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              message.type === 'error'
                ? 'bg-destructive/10 text-destructive'
                : message.type === 'success'
                ? 'bg-sorting/10 text-sorting'
                : 'bg-primary/10 text-primary'
            }`}
          >
            <AlertCircle className="h-4 w-4" />
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capacity indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Capacity</span>
          <span className="font-mono">
            {stack.length} / {maxCapacity}
          </span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className={`h-full ${fillColor} transition-colors`}
            initial={{ width: 0 }}
            animate={{ width: `${fillPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Stack Visualization */}
      <div className="visualizer-container flex items-end justify-center">
        <div className="relative">
          {/* Stack container */}
          <div className="flex flex-col-reverse items-center gap-2 min-h-[300px] justify-start">
            <AnimatePresence mode="popLayout">
              {stack.map((element, index) => (
                <motion.div
                  key={element.id}
                  initial={{ y: -50, opacity: 0, scale: 0.8 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: peekingIndex === index ? 1.1 : 1,
                  }}
                  exit={{
                    scale: 0,
                    rotate: 360,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                  className={`stack-element gradient-data-structure text-white min-w-[100px] text-center ${
                    peekingIndex === index ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''
                  } ${index === stack.length - 1 ? 'relative' : ''}`}
                >
                  {element.value}
                  {index === stack.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs font-medium text-primary"
                    >
                      ← TOP
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {stack.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-center py-8"
              >
                <p className="text-lg font-medium">Stack is empty</p>
                <p className="text-sm">Push some elements to get started</p>
              </motion.div>
            )}
          </div>

          {/* Base */}
          <div className="w-40 h-2 bg-border rounded-full mx-auto mt-2" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded gradient-data-structure" />
          <span className="text-muted-foreground">Stack Element</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded ring-2 ring-primary" />
          <span className="text-muted-foreground">Peeking</span>
        </div>
      </div>
    </div>
  );
};
