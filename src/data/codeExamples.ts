export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  complexity: string;
  language: string;
}

export const stackCodeExamples: CodeExample[] = [
  {
    id: 'stack-push',
    title: 'Push Operation',
    description: 'Add element to top of stack',
    code: `public void push(T element) {
    if (size >= capacity) {
        throw new StackOverflowException();
    }
    elements[++top] = element;
    size++;
}`,
    complexity: 'O(1)',
    language: 'java',
  },
  {
    id: 'stack-pop',
    title: 'Pop Operation',
    description: 'Remove and return top element',
    code: `public T pop() {
    if (isEmpty()) {
        throw new StackUnderflowException();
    }
    T element = elements[top];
    elements[top--] = null;
    size--;
    return element;
}`,
    complexity: 'O(1)',
    language: 'java',
  },
  {
    id: 'stack-peek',
    title: 'Peek Operation',
    description: 'View top element without removing',
    code: `public T peek() {
    if (isEmpty()) {
        throw new EmptyStackException();
    }
    return elements[top];
}`,
    complexity: 'O(1)',
    language: 'java',
  },
];

export const queueCodeExamples: CodeExample[] = [
  {
    id: 'queue-enqueue',
    title: 'Enqueue Operation',
    description: 'Add element to rear of queue',
    code: `public void enqueue(T element) {
    if (size >= capacity) {
        throw new QueueFullException();
    }
    rear = (rear + 1) % capacity;
    elements[rear] = element;
    size++;
}`,
    complexity: 'O(1)',
    language: 'java',
  },
  {
    id: 'queue-dequeue',
    title: 'Dequeue Operation',
    description: 'Remove and return front element',
    code: `public T dequeue() {
    if (isEmpty()) {
        throw new EmptyQueueException();
    }
    T element = elements[front];
    elements[front] = null;
    front = (front + 1) % capacity;
    size--;
    return element;
}`,
    complexity: 'O(1)',
    language: 'java',
  },
];

export const sortingCodeExamples: Record<string, CodeExample> = {
  bubble: {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    description: 'Compare adjacent elements and swap if out of order',
    code: `public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    complexity: 'O(n²)',
    language: 'java',
  },
  selection: {
    id: 'selection-sort',
    title: 'Selection Sort',
    description: 'Find minimum and place at beginning',
    code: `public void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap arr[i] and arr[minIdx]
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}`,
    complexity: 'O(n²)',
    language: 'java',
  },
  insertion: {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    description: 'Insert each element into its correct position',
    code: `public void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    complexity: 'O(n²)',
    language: 'java',
  },
  quick: {
    id: 'quick-sort',
    title: 'Quick Sort',
    description: 'Divide and conquer using pivot element',
    code: `public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}`,
    complexity: 'O(n log n)',
    language: 'java',
  },
  merge: {
    id: 'merge-sort',
    title: 'Merge Sort',
    description: 'Divide array and merge sorted halves',
    code: `public void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

private void merge(int[] arr, int l, int m, int r) {
    // Create temp arrays and merge
    int[] L = Arrays.copyOfRange(arr, l, m + 1);
    int[] R = Arrays.copyOfRange(arr, m + 1, r + 1);
    // Merge L and R back into arr[l..r]
}`,
    complexity: 'O(n log n)',
    language: 'java',
  },
};

export const searchingCodeExamples: Record<string, CodeExample> = {
  linear: {
    id: 'linear-search',
    title: 'Linear Search',
    description: 'Search each element sequentially',
    code: `public int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}`,
    complexity: 'O(n)',
    language: 'java',
  },
  binary: {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Search in sorted array by halving search space',
    code: `public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
    complexity: 'O(log n)',
    language: 'java',
  },
};
