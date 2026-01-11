import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { SortingVisualizer } from '@/components/visualizers/SortingVisualizer';
import { BarChart3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const algorithms = [
  {
    name: 'Bubble Sort',
    time: 'O(n²)',
    space: 'O(1)',
    stable: true,
    description: 'Repeatedly swaps adjacent elements if they are in wrong order.',
  },
  {
    name: 'Selection Sort',
    time: 'O(n²)',
    space: 'O(1)',
    stable: false,
    description: 'Finds minimum element and places it at the beginning.',
  },
  {
    name: 'Insertion Sort',
    time: 'O(n²)',
    space: 'O(1)',
    stable: true,
    description: 'Builds sorted array one element at a time.',
  },
  {
    name: 'Quick Sort',
    time: 'O(n log n)',
    space: 'O(log n)',
    stable: false,
    description: 'Divides array using pivot and conquers recursively.',
  },
  {
    name: 'Merge Sort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    description: 'Divides array, sorts halves, and merges them.',
  },
];

const SortingPage = () => {
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
            <div className="gradient-sorting p-3 rounded-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sorting Algorithms</h1>
              <p className="text-muted-foreground">
                Visualize and compare different sorting techniques
              </p>
            </div>
          </div>
        </motion.div>

        {/* Algorithm Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4 mb-8 overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Algorithm</th>
                <th className="text-left py-3 px-4 font-semibold">Time</th>
                <th className="text-left py-3 px-4 font-semibold">Space</th>
                <th className="text-left py-3 px-4 font-semibold">Stable</th>
                <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {algorithms.map((algo, index) => (
                <tr
                  key={algo.name}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{algo.name}</td>
                  <td className="py-3 px-4 font-mono text-sorting">
                    {algo.time}
                  </td>
                  <td className="py-3 px-4 font-mono text-muted-foreground">
                    {algo.space}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        algo.stable
                          ? 'bg-sorting/10 text-sorting'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {algo.stable ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                    {algo.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SortingVisualizer />
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">💡 Tips for Understanding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Use slower speeds to observe each comparison and swap',
              'Notice how efficient algorithms (Quick, Merge) handle larger arrays',
              'Watch the color coding: orange = comparing, red = swapping, green = sorted',
              'Try different array sizes to see complexity differences',
              'Compare the number of comparisons and swaps between algorithms',
              'Stable sorts maintain relative order of equal elements',
            ].map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-sorting mt-2" />
                {tip}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SortingPage;
