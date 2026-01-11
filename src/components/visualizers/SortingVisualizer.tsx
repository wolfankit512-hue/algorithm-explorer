import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Shuffle, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CodeViewer } from '@/components/common/CodeViewer';
import { sortingCodeExamples } from '@/data/codeExamples';

type SortingAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge';

interface Bar {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

const algorithmLabels: Record<SortingAlgorithm, string> = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  quick: 'Quick Sort',
  merge: 'Merge Sort',
};

export const SortingVisualizer = () => {
  const [array, setArray] = useState<Bar[]>([]);
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const isSortingRef = useRef(false);
  const isPausedRef = useRef(false);

  const generateArray = useCallback(() => {
    const newArray: Bar[] = Array.from({ length: arraySize }, () => ({
      value: Math.floor(Math.random() * 100) + 5,
      state: 'default' as const,
    }));
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const getDelay = () => Math.max(1, 101 - speed);

  const updateArray = (newArray: Bar[]) => {
    setArray([...newArray]);
  };

  const checkPaused = async () => {
    while (isPausedRef.current && isSortingRef.current) {
      await sleep(100);
    }
  };

  // Bubble Sort
  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;
        await checkPaused();

        arr[j].state = 'comparing';
        arr[j + 1].state = 'comparing';
        updateArray(arr);
        setComparisons((c) => c + 1);
        await sleep(getDelay());

        if (arr[j].value > arr[j + 1].value) {
          arr[j].state = 'swapping';
          arr[j + 1].state = 'swapping';
          updateArray(arr);
          await sleep(getDelay());

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSwaps((s) => s + 1);
        }

        arr[j].state = 'default';
        arr[j + 1].state = 'default';
        updateArray(arr);
      }
      arr[n - 1 - i].state = 'sorted';
      updateArray(arr);
    }
    arr[0].state = 'sorted';
    updateArray(arr);
  };

  // Selection Sort
  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      if (!isSortingRef.current) return;
      
      let minIdx = i;
      arr[i].state = 'comparing';
      updateArray(arr);

      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) return;
        await checkPaused();

        arr[j].state = 'comparing';
        updateArray(arr);
        setComparisons((c) => c + 1);
        await sleep(getDelay());

        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].state = 'default';
          minIdx = j;
          arr[minIdx].state = 'swapping';
        } else {
          arr[j].state = 'default';
        }
        updateArray(arr);
      }

      if (minIdx !== i) {
        arr[i].state = 'swapping';
        arr[minIdx].state = 'swapping';
        updateArray(arr);
        await sleep(getDelay());

        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setSwaps((s) => s + 1);
      }

      arr[i].state = 'sorted';
      if (minIdx !== i) arr[minIdx].state = 'default';
      updateArray(arr);
    }
    arr[n - 1].state = 'sorted';
    updateArray(arr);
  };

  // Insertion Sort
  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    arr[0].state = 'sorted';
    updateArray(arr);

    for (let i = 1; i < n; i++) {
      if (!isSortingRef.current) return;

      const key = arr[i];
      key.state = 'comparing';
      updateArray(arr);
      await sleep(getDelay());

      let j = i - 1;
      while (j >= 0 && arr[j].value > key.value) {
        if (!isSortingRef.current) return;
        await checkPaused();

        arr[j].state = 'swapping';
        setComparisons((c) => c + 1);
        updateArray(arr);
        await sleep(getDelay());

        arr[j + 1] = arr[j];
        arr[j].state = 'sorted';
        setSwaps((s) => s + 1);
        updateArray(arr);
        j--;
      }

      arr[j + 1] = key;
      arr[j + 1].state = 'sorted';
      updateArray(arr);
    }
  };

  // Quick Sort
  const quickSort = async () => {
    const arr = [...array];

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      pivot.state = 'pivot';
      updateArray(arr);

      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (!isSortingRef.current) return -1;
        await checkPaused();

        arr[j].state = 'comparing';
        updateArray(arr);
        setComparisons((c) => c + 1);
        await sleep(getDelay());

        if (arr[j].value < pivot.value) {
          i++;
          arr[i].state = 'swapping';
          arr[j].state = 'swapping';
          updateArray(arr);
          await sleep(getDelay());

          [arr[i], arr[j]] = [arr[j], arr[i]];
          setSwaps((s) => s + 1);
        }

        if (arr[j].state !== 'sorted') arr[j].state = 'default';
        if (arr[i]?.state !== 'sorted') arr[i].state = 'default';
        updateArray(arr);
      }

      arr[i + 1].state = 'swapping';
      arr[high].state = 'swapping';
      updateArray(arr);
      await sleep(getDelay());

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setSwaps((s) => s + 1);

      arr[i + 1].state = 'sorted';
      updateArray(arr);

      return i + 1;
    };

    const sort = async (low: number, high: number) => {
      if (low < high && isSortingRef.current) {
        const pi = await partition(low, high);
        if (pi === -1) return;

        await sort(low, pi - 1);
        await sort(pi + 1, high);
      } else if (low === high) {
        arr[low].state = 'sorted';
        updateArray(arr);
      }
    };

    await sort(0, arr.length - 1);
  };

  // Merge Sort
  const mergeSort = async () => {
    const arr = [...array];

    const merge = async (left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);

      let i = 0,
        j = 0,
        k = left;

      while (i < leftArr.length && j < rightArr.length) {
        if (!isSortingRef.current) return;
        await checkPaused();

        setComparisons((c) => c + 1);

        if (leftArr[i].value <= rightArr[j].value) {
          arr[k] = { ...leftArr[i], state: 'swapping' };
          i++;
        } else {
          arr[k] = { ...rightArr[j], state: 'swapping' };
          j++;
        }
        setSwaps((s) => s + 1);
        updateArray(arr);
        await sleep(getDelay());
        arr[k].state = 'default';
        k++;
      }

      while (i < leftArr.length) {
        if (!isSortingRef.current) return;
        arr[k] = { ...leftArr[i], state: 'swapping' };
        updateArray(arr);
        await sleep(getDelay());
        arr[k].state = 'default';
        i++;
        k++;
      }

      while (j < rightArr.length) {
        if (!isSortingRef.current) return;
        arr[k] = { ...rightArr[j], state: 'swapping' };
        updateArray(arr);
        await sleep(getDelay());
        arr[k].state = 'default';
        j++;
        k++;
      }
    };

    const sort = async (left: number, right: number) => {
      if (left < right && isSortingRef.current) {
        const mid = Math.floor((left + right) / 2);
        await sort(left, mid);
        await sort(mid + 1, right);
        await merge(left, mid, right);
      }
    };

    await sort(0, arr.length - 1);
    arr.forEach((bar) => (bar.state = 'sorted'));
    updateArray(arr);
  };

  const startSorting = async () => {
    setIsSorting(true);
    setIsPaused(false);
    isSortingRef.current = true;
    isPausedRef.current = false;
    setComparisons(0);
    setSwaps(0);

    // Reset states
    const resetArray = array.map((bar) => ({ ...bar, state: 'default' as const }));
    setArray(resetArray);

    switch (algorithm) {
      case 'bubble':
        await bubbleSort();
        break;
      case 'selection':
        await selectionSort();
        break;
      case 'insertion':
        await insertionSort();
        break;
      case 'quick':
        await quickSort();
        break;
      case 'merge':
        await mergeSort();
        break;
    }

    setIsSorting(false);
    isSortingRef.current = false;
  };

  const pauseSorting = () => {
    setIsPaused(!isPaused);
    isPausedRef.current = !isPausedRef.current;
  };

  const stopSorting = () => {
    isSortingRef.current = false;
    isPausedRef.current = false;
    setIsSorting(false);
    setIsPaused(false);
    generateArray();
  };

  const getBarColor = (state: Bar['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-searching';
      case 'swapping':
        return 'bg-destructive';
      case 'sorted':
        return 'bg-sorting';
      case 'pivot':
        return 'bg-graph';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Select
          value={algorithm}
          onValueChange={(value: SortingAlgorithm) => setAlgorithm(value)}
          disabled={isSorting}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(algorithmLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          {!isSorting ? (
            <Button onClick={startSorting} className="gap-2 gradient-sorting text-white border-0">
              <Play className="h-4 w-4" />
              Sort
            </Button>
          ) : (
            <Button onClick={pauseSorting} variant="secondary" className="gap-2">
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
          )}
          <Button variant="outline" onClick={stopSorting} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" onClick={generateArray} disabled={isSorting} className="gap-2">
            <Shuffle className="h-4 w-4" />
            Randomize
          </Button>
        </div>

        <div className="ml-auto">
          <CodeViewer examples={Object.values(sortingCodeExamples)} />
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
            min={10}
            max={100}
            step={5}
            onValueChange={([value]) => setArraySize(value)}
            disabled={isSorting}
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
          <span className="text-muted-foreground">Swaps:</span>
          <span className="font-mono font-medium">{swaps}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Algorithm:</span>
          <span className="font-medium">{algorithmLabels[algorithm]}</span>
        </div>
      </div>

      {/* Visualization */}
      <div className="visualizer-container">
        <div className="flex items-end justify-center gap-[2px] h-[400px]">
          {array.map((bar, index) => (
            <motion.div
              key={index}
              className={`bar-element ${getBarColor(bar.state)}`}
              style={{
                width: `${Math.max(4, 100 / arraySize)}%`,
                maxWidth: '30px',
              }}
              initial={false}
              animate={{
                height: `${bar.value}%`,
                scale: bar.state === 'comparing' || bar.state === 'swapping' ? 1.05 : 1,
              }}
              transition={{
                height: { duration: 0.1 },
                scale: { duration: 0.1 },
              }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-muted-foreground">Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-searching" />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive" />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-sorting" />
          <span className="text-muted-foreground">Sorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-graph" />
          <span className="text-muted-foreground">Pivot</span>
        </div>
      </div>
    </div>
  );
};
