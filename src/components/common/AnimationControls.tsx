import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

interface AnimationControlsProps {
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

export const AnimationControls = ({
  isPlaying,
  speed,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  disabled = false,
}: AnimationControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="control-panel"
    >
      <div className="flex items-center gap-2">
        {onStepBackward && (
          <Button
            variant="outline"
            size="icon"
            onClick={onStepBackward}
            disabled={disabled || isPlaying}
            className="h-9 w-9"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant={isPlaying ? 'secondary' : 'default'}
          size="icon"
          onClick={isPlaying ? onPause : onPlay}
          disabled={disabled}
          className="h-10 w-10"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {onStepForward && (
          <Button
            variant="outline"
            size="icon"
            onClick={onStepForward}
            disabled={disabled || isPlaying}
            className="h-9 w-9"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          disabled={disabled}
          className="h-9 w-9"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-8 w-px bg-border mx-2" />

      <div className="flex items-center gap-3 min-w-[180px]">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Speed: {speed}x
        </span>
        <Slider
          value={[speed]}
          min={0.25}
          max={4}
          step={0.25}
          onValueChange={([value]) => onSpeedChange(value)}
          className="w-24"
          disabled={disabled}
        />
      </div>
    </motion.div>
  );
};
