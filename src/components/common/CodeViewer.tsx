import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Code, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeExample } from '@/data/codeExamples';
import { useTheme } from '@/hooks/useTheme';

interface CodeViewerProps {
  examples: CodeExample[];
  triggerLabel?: string;
}

export const CodeViewer = ({ examples, triggerLabel = 'View Code' }: CodeViewerProps) => {
  const [copied, setCopied] = useState(false);
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const { isDark } = useTheme();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(selectedExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Code className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Code Examples
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 flex-wrap">
          {examples.map((example) => (
            <Button
              key={example.id}
              variant={selectedExample.id === example.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedExample(example)}
              className="text-xs"
            >
              {example.title}
            </Button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden rounded-lg border border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{selectedExample.title}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
                {selectedExample.complexity}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 gap-2"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div className="overflow-auto max-h-[400px]">
            <SyntaxHighlighter
              language={selectedExample.language}
              style={isDark ? oneDark : oneLight}
              customStyle={{
                margin: 0,
                padding: '1rem',
                fontSize: '0.875rem',
                background: 'transparent',
              }}
              showLineNumbers
            >
              {selectedExample.code}
            </SyntaxHighlighter>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{selectedExample.description}</p>
      </DialogContent>
    </Dialog>
  );
};
