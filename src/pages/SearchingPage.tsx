import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { SearchingVisualizer } from '@/components/visualizers/SearchingVisualizer';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const algorithms = [
  {
    name: 'Linear Search',
    time: 'O(n)',
    space: 'O(1)',
    requires: 'None',
    description: 'Sequentially checks each element until a match is found.',
  },
  {
    name: 'Binary Search',
    time: 'O(log n)',
    space: 'O(1)',
    requires: 'Sorted array',
    description: 'Repeatedly divides search interval in half.',
  },
];

const SearchingPage = () => {
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
            <div className="gradient-searching p-3 rounded-xl">
              <Search className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Searching Algorithms</h1>
              <p className="text-muted-foreground">
                Compare linear and binary search techniques
              </p>
            </div>
          </div>
        </motion.div>

        {/* Algorithm Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {algorithms.map((algo) => (
            <div key={algo.name} className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">{algo.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {algo.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Time Complexity:</span>
                  <span className="font-mono text-searching">{algo.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Space Complexity:</span>
                  <span className="font-mono">{algo.space}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Prerequisite:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      algo.requires === 'None'
                        ? 'bg-sorting/10 text-sorting'
                        : 'bg-searching/10 text-searching'
                    }`}
                  >
                    {algo.requires}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SearchingVisualizer />
        </motion.div>

        {/* When to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">When to Use Linear Search</h3>
            <ul className="space-y-2">
              {[
                'Array is unsorted or small (< 20 elements)',
                'Single search operation needed',
                'Data is stored in linked list',
                'Searching through stream of data',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-searching mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">When to Use Binary Search</h3>
            <ul className="space-y-2">
              {[
                'Array is sorted',
                'Multiple search operations needed',
                'Large dataset (thousands+ elements)',
                'Data is stored in array (random access)',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-sorting mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SearchingPage;
