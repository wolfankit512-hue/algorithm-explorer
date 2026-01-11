import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Eye, Trash2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CodeViewer } from '@/components/common/CodeViewer';
import { queueCodeExamples } from '@/data/codeExamples';

interface QueueElement {
  id: number;
  value: number;
}

export const QueueVisualizer = () => {
  const [queue, setQueue] = useState<QueueElement[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [maxCapacity] = useState(8);
  const [peekingIndex, setPeekingIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [nextId, setNextId] = useState(0);

  const showMessage = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2000);
  };

  const enqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      showMessage('Please enter a valid number', 'error');
      return;
    }
    if (queue.length >= maxCapacity) {
      showMessage('Queue Full! Maximum capacity reached', 'error');
      return;
    }
    setQueue([...queue, { id: nextId, value }]);
    setNextId(nextId + 1);
    setInputValue('');
    showMessage(`Enqueued ${value}`, 'success');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      showMessage('Queue Empty! Nothing to dequeue', 'error');
      return;
    }
    const dequeued = queue[0];
    setQueue(queue.slice(1));
    showMessage(`Dequeued ${dequeued.value}`, 'success');
  };

  const peek = () => {
    if (queue.length === 0) {
      showMessage('Queue is empty!', 'error');
      return;
    }
    setPeekingIndex(0);
    showMessage(`Front element: ${queue[0].value}`, 'info');
    setTimeout(() => setPeekingIndex(null), 1500);
  };

  const clear = () => {
    setQueue([]);
    showMessage('Queue cleared', 'info');
  };

  const fillPercentage = (queue.length / maxCapacity) * 100;

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
            onKeyDown={(e) => e.key === 'Enter' && enqueue()}
            className="w-32"
          />
          <Button onClick={enqueue} className="gap-2 gradient-data-structure text-white border-0">
            <Plus className="h-4 w-4" />
            Enqueue
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={dequeue} className="gap-2">
            <Minus className="h-4 w-4" />
            Dequeue
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
          <CodeViewer examples={queueCodeExamples} />
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
            {queue.length} / {maxCapacity}
          </span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-dataStructure"
            initial={{ width: 0 }}
            animate={{ width: `${fillPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Queue Visualization */}
      <div className="visualizer-container">
        <div className="flex items-center justify-center min-h-[200px]">
          {queue.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-center"
            >
              <p className="text-lg font-medium">Queue is empty</p>
              <p className="text-sm">Enqueue some elements to get started</p>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1">
              {/* Front indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center mr-4"
              >
                <span className="text-xs font-medium text-sorting mb-2">FRONT</span>
                <ArrowRight className="h-6 w-6 text-sorting" />
              </motion.div>

              <AnimatePresence mode="popLayout">
                {queue.map((element, index) => (
                  <motion.div
                    key={element.id}
                    initial={{ x: 100, opacity: 0, scale: 0.8 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      scale: peekingIndex === index ? 1.1 : 1,
                    }}
                    exit={{
                      x: -100,
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                    className={`queue-element gradient-data-structure text-white ${
                      peekingIndex === index
                        ? 'ring-4 ring-primary ring-offset-2 ring-offset-background'
                        : ''
                    }`}
                  >
                    {element.value}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Rear indicator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center ml-4"
              >
                <span className="text-xs font-medium text-primary mb-2">REAR</span>
                <ArrowRight className="h-6 w-6 text-primary rotate-180" />
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded gradient-data-structure" />
          <span className="text-muted-foreground">Queue Element</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-sorting" />
          <span className="text-muted-foreground">Dequeue (Front)</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-primary rotate-180" />
          <span className="text-muted-foreground">Enqueue (Rear)</span>
        </div>
      </div>
    </div>
  );
};
