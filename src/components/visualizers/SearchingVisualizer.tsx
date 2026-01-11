import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shuffle, RotateCcw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CodeViewer } from '@/components/common/CodeViewer';
import { searchingCodeExamples } from '@/data/codeExamples';

type SearchAlgorithm = 'linear' | 'binary';

interface ArrayElement {
  value: number;
  state: 'default' | 'current' | 'found' | 'eliminated' | 'range';
}

export const SearchingVisualizer = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [arraySize, setArraySize] = useState(15);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm>('linear');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [comparisons, setComparisons] = useState(0);

  const generateArray = useCallback(() => {
    let values: number[];
    if (algorithm === 'binary') {
      // Generate sorted array for binary search
      values = Array.from({ length: arraySize }, (_, i) => (i + 1) * 5 + Math.floor(Math.random() * 3));
    } else {
      values = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    }
    setArray(values.map((value) => ({ value, state: 'default' })));
    setComparisons(0);
    setMessage(null);
  }, [arraySize, algorithm]);

  useState(() => {
    generateArray();
  });

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const getDelay = () => Math.max(100, 1000 - speed * 9);

  const linearSearch = async (target: number) => {
    const arr = [...array];
    setComparisons(0);

    for (let i = 0; i < arr.length; i++) {
      arr[i].state = 'current';
      setArray([...arr]);
      setComparisons((c) => c + 1);
      await sleep(getDelay());

      if (arr[i].value === target) {
        arr[i].state = 'found';
        setArray([...arr]);
        setMessage(`Found ${target} at index ${i}!`);
        return true;
      }

      arr[i].state = 'eliminated';
      setArray([...arr]);
    }

    setMessage(`${target} not found in the array`);
    return false;
  };

  const binarySearch = async (target: number) => {
    const arr = [...array];
    setComparisons(0);

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      // Highlight search range
      arr.forEach((el, i) => {
        if (i >= left && i <= right) {
          el.state = 'range';
        } else if (el.state !== 'eliminated') {
          el.state = 'eliminated';
        }
      });
      setArray([...arr]);
      await sleep(getDelay());

      const mid = Math.floor((left + right) / 2);
      arr[mid].state = 'current';
      setArray([...arr]);
      setComparisons((c) => c + 1);
      await sleep(getDelay());

      if (arr[mid].value === target) {
        arr[mid].state = 'found';
        setArray([...arr]);
        setMessage(`Found ${target} at index ${mid}!`);
        return true;
      }

      if (arr[mid].value < target) {
        for (let i = left; i <= mid; i++) {
          arr[i].state = 'eliminated';
        }
        left = mid + 1;
      } else {
        for (let i = mid; i <= right; i++) {
          arr[i].state = 'eliminated';
        }
        right = mid - 1;
      }
      setArray([...arr]);
      await sleep(getDelay());
    }

    setMessage(`${target} not found in the array`);
    return false;
  };

  const startSearch = async () => {
    const target = parseInt(searchValue);
    if (isNaN(target)) {
      setMessage('Please enter a valid number to search');
      return;
    }

    setIsSearching(true);
    setMessage(null);

    // Reset states
    const resetArray = array.map((el) => ({ ...el, state: 'default' as const }));
    setArray(resetArray);

    if (algorithm === 'linear') {
      await linearSearch(target);
    } else {
      await binarySearch(target);
    }

    setIsSearching(false);
  };

  const getElementColor = (state: ArrayElement['state']) => {
    switch (state) {
      case 'current':
        return 'bg-searching border-searching';
      case 'found':
        return 'bg-sorting border-sorting';
      case 'eliminated':
        return 'bg-muted/50 border-muted text-muted-foreground';
      case 'range':
        return 'bg-primary/20 border-primary';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Select
          value={algorithm}
          onValueChange={(value: SearchAlgorithm) => {
            setAlgorithm(value);
            setTimeout(generateArray, 0);
          }}
          disabled={isSearching}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear Search</SelectItem>
            <SelectItem value="binary">Binary Search</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isSearching && startSearch()}
            className="w-32"
            disabled={isSearching}
          />
          <Button
            onClick={startSearch}
            disabled={isSearching}
            className="gap-2 gradient-searching text-white border-0"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={generateArray} disabled={isSearching} className="gap-2">
            <Shuffle className="h-4 w-4" />
            New Array
          </Button>
        </div>

        <div className="ml-auto">
          <CodeViewer examples={Object.values(searchingCodeExamples)} />
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Array Size</span>
            <span className="font-mono">{arraySize}</span>
          </div>
          <Slider
            value={[arraySize]}
            min={5}
            max={30}
            step={1}
            onValueChange={([value]) => {
              setArraySize(value);
              setTimeout(generateArray, 0);
            }}
            disabled={isSearching}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Speed</span>
            <span className="font-mono">{speed}%</span>
          </div>
          <Slider value={[speed]} min={1} max={100} step={1} onValueChange={([value]) => setSpeed(value)} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Comparisons:</span>
          <span className="font-mono font-medium">{comparisons}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Algorithm:</span>
          <span className="font-medium">{algorithm === 'linear' ? 'Linear Search' : 'Binary Search'}</span>
        </div>
        {algorithm === 'binary' && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs">(Array is sorted for binary search)</span>
          </div>
        )}
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`px-4 py-3 rounded-lg text-center font-medium ${
              message.includes('Found')
                ? 'bg-sorting/10 text-sorting'
                : message.includes('not found')
                ? 'bg-destructive/10 text-destructive'
                : 'bg-searching/10 text-searching'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualization */}
      <div className="visualizer-container">
        <div className="flex items-center justify-center gap-2 flex-wrap min-h-[200px]">
          {array.map((element, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: element.state === 'current' || element.state === 'found' ? 1.1 : 1,
                opacity: 1,
              }}
              className={`w-14 h-14 rounded-lg border-2 flex flex-col items-center justify-center transition-colors ${getElementColor(
                element.state
              )}`}
            >
              <span className="font-mono font-bold">{element.value}</span>
              <span className="text-[10px] text-muted-foreground">[{index}]</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-border bg-card" />
          <span className="text-muted-foreground">Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-searching" />
          <span className="text-muted-foreground">Checking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-sorting" />
          <span className="text-muted-foreground">Found</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted/50" />
          <span className="text-muted-foreground">Eliminated</span>
        </div>
        {algorithm === 'binary' && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-primary bg-primary/20" />
            <span className="text-muted-foreground">Search Range</span>
          </div>
        )}
      </div>
    </div>
  );
};
