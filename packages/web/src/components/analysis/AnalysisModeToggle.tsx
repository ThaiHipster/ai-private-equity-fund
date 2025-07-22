'use client';

import type { AnalysisMode, AnalysisModeKey } from '@ai-pe-fund/shared';
import { ANALYSIS_MODE_CONFIGS } from '@ai-pe-fund/shared';
import { cn } from '../../lib/utils';

type AnalysisModeToggleProps = {
  currentMode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
  className?: string;
};

export function AnalysisModeToggle({
  currentMode,
  onModeChange,
  className,
}: AnalysisModeToggleProps) {
  const modes = Object.keys(ANALYSIS_MODE_CONFIGS) as AnalysisModeKey[];

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {modes.map((modeKey) => {
        const config = ANALYSIS_MODE_CONFIGS[modeKey];
        const isActive = config.mode === currentMode;

        return (
          <button
            key={config.mode}
            type="button"
            onClick={() => onModeChange(config.mode)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              'hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              isActive
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
            title={config.description}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
