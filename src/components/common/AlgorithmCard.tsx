import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface AlgorithmCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: 'data-structure' | 'sorting' | 'searching' | 'graph';
  delay?: number;
}

const categoryStyles = {
  'data-structure': {
    gradient: 'gradient-data-structure',
    glow: 'glow-data-structure',
    text: 'text-dataStructure',
  },
  sorting: {
    gradient: 'gradient-sorting',
    glow: 'glow-sorting',
    text: 'text-sorting',
  },
  searching: {
    gradient: 'gradient-searching',
    glow: 'glow-searching',
    text: 'text-searching',
  },
  graph: {
    gradient: 'gradient-graph',
    glow: 'glow-graph',
    text: 'text-graph',
  },
};

export const AlgorithmCard = ({
  title,
  description,
  icon: Icon,
  path,
  category,
  delay = 0,
}: AlgorithmCardProps) => {
  const styles = categoryStyles[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={path}>
        <div className={`glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:${styles.glow}`}>
          <div className="flex items-start justify-between mb-4">
            <div
              className={`${styles.gradient} p-3 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <ArrowRight className={`h-5 w-5 ${styles.text}`} />
            </motion.div>
          </div>

          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className={`h-1 w-12 rounded-full ${styles.gradient} opacity-60`} />
            <span className={`text-xs font-medium ${styles.text}`}>
              {category.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
