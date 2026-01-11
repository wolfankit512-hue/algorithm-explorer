import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { StackVisualizer } from '@/components/visualizers/StackVisualizer';
import { Layers, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StackPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="gradient-data-structure p-3 rounded-xl">
              <Layers className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Stack Data Structure</h1>
              <p className="text-muted-foreground">
                Last In, First Out (LIFO) data structure
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-dataStructure/10 text-dataStructure">
              <span className="font-medium">Time Complexity:</span>
              <span className="font-mono">O(1) for all operations</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-dataStructure/10 text-dataStructure">
              <span className="font-medium">Space Complexity:</span>
              <span className="font-mono">O(n)</span>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold mb-2">Push</h3>
            <p className="text-sm text-muted-foreground">
              Add an element to the top of the stack. If the stack is full, it
              causes a Stack Overflow.
            </p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold mb-2">Pop</h3>
            <p className="text-sm text-muted-foreground">
              Remove and return the top element. If the stack is empty, it
              causes a Stack Underflow.
            </p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold mb-2">Peek</h3>
            <p className="text-sm text-muted-foreground">
              View the top element without removing it. Useful for checking
              the next element to be processed.
            </p>
          </div>
        </motion.div>

        {/* Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StackVisualizer />
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Undo/Redo operations in text editors',
              'Browser history (back button)',
              'Expression evaluation and parsing',
              'Function call stack in programming',
              'Syntax checking (matching parentheses)',
              'Backtracking algorithms',
            ].map((useCase, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-dataStructure" />
                {useCase}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default StackPage;
