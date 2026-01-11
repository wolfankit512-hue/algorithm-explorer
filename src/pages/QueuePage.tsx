import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { QueueVisualizer } from '@/components/visualizers/QueueVisualizer';
import { ListOrdered, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const QueuePage = () => {
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
              <ListOrdered className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Queue Data Structure</h1>
              <p className="text-muted-foreground">
                First In, First Out (FIFO) data structure
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
            <h3 className="font-semibold mb-2">Enqueue</h3>
            <p className="text-sm text-muted-foreground">
              Add an element to the rear of the queue. If the queue is full, it
              causes an overflow condition.
            </p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold mb-2">Dequeue</h3>
            <p className="text-sm text-muted-foreground">
              Remove and return the front element. If the queue is empty, it
              causes an underflow condition.
            </p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-semibold mb-2">Peek / Front</h3>
            <p className="text-sm text-muted-foreground">
              View the front element without removing it. Useful for checking
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
          <QueueVisualizer />
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
              'Task scheduling in operating systems',
              'Print job spooling',
              'Breadth-First Search (BFS) traversal',
              'Message queues in distributed systems',
              'Customer service call centers',
              'Buffer for streaming data',
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

export default QueuePage;
