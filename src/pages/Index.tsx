import { motion } from 'framer-motion';
import { AlgorithmCard } from '@/components/common/AlgorithmCard';
import { Header } from '@/components/layout/Header';
import {
  Layers,
  ListOrdered,
  Link2,
  Hash,
  BarChart3,
  Search,
  GitBranch,
  Activity,
  Sparkles,
  Zap,
  Code2,
} from 'lucide-react';

const algorithmCategories = [
  {
    title: 'Stack',
    description: 'LIFO data structure with push, pop, and peek operations. Perfect for undo systems and expression evaluation.',
    icon: Layers,
    path: '/stack',
    category: 'data-structure' as const,
  },
  {
    title: 'Queue',
    description: 'FIFO data structure with enqueue and dequeue operations. Essential for task scheduling and BFS.',
    icon: ListOrdered,
    path: '/queue',
    category: 'data-structure' as const,
  },
  {
    title: 'Sorting Algorithms',
    description: 'Visualize Bubble, Selection, Insertion, Quick, and Merge sort with step-by-step animations.',
    icon: BarChart3,
    path: '/sorting',
    category: 'sorting' as const,
  },
  {
    title: 'Searching Algorithms',
    description: 'Compare Linear and Binary search algorithms with visual feedback on each comparison.',
    icon: Search,
    path: '/searching',
    category: 'searching' as const,
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'Interactive Visualizations',
    description: 'Watch algorithms come to life with smooth, step-by-step animations',
  },
  {
    icon: Zap,
    title: 'Speed Control',
    description: 'Adjust animation speed to learn at your own pace',
  },
  {
    icon: Code2,
    title: 'Code Examples',
    description: 'View implementation code with syntax highlighting',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" />
            Interactive Algorithm Learning
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Master Algorithms with
            <br />
            <span className="text-gradient-primary">Visual Learning</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Explore data structures and algorithms through beautiful, interactive
            visualizations. Watch, learn, and understand how they work.
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{feature.title}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Algorithm Cards Grid */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Explore Algorithms</h2>
              <p className="text-muted-foreground">
                Choose a data structure or algorithm to visualize
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algorithmCategories.map((algo, index) => (
              <AlgorithmCard
                key={algo.title}
                {...algo}
                delay={0.1 * index + 0.5}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '4+', label: 'Data Structures' },
              { value: '5+', label: 'Sorting Algorithms' },
              { value: '2+', label: 'Search Algorithms' },
              { value: '∞', label: 'Visualizations' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-semibold">AlgorithmSim</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for learning. Made with ❤️ by Ankit Raj
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
