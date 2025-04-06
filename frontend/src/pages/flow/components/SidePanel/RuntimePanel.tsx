import React from 'react';
import { PlayIcon, StopIcon, PauseIcon } from '@heroicons/react/24/outline';

const RuntimePanel: React.FC = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Control buttons */}
      <div className="p-2 border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2 flex justify-between items-center">
        <div className="flex gap-2">
          <button className="p-2 rounded-md bg-tf-accent-emerald/10 dark:bg-tf-accent-emerald/10 hover:bg-tf-accent-emerald/20 dark:hover:bg-tf-accent-emerald/20 text-tf-accent-emerald dark:text-tf-accent-emerald transition-colors duration-200">
            <PlayIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-md bg-tf-accent-amber-light/10 dark:bg-tf-accent-amber/10 hover:bg-tf-accent-amber-light/20 dark:hover:bg-tf-accent-amber/20 text-tf-accent-amber-light dark:text-tf-accent-amber transition-colors duration-200">
            <PauseIcon className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-md bg-tf-accent-rose/10 dark:bg-tf-accent-rose/10 hover:bg-tf-accent-rose/20 dark:hover:bg-tf-accent-rose/20 text-tf-accent-rose dark:text-tf-accent-rose transition-colors duration-200">
            <StopIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext">
          Runtime: 00:00:00
        </div>
      </div>

      {/* Execution logs */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-4">
          <div className="text-sm text-tf-base-subtext-lmode/60 dark:text-tf-base-subtext/60">
            Execution logs will appear here...
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="p-2 border-t border-tf-base-bg2-lmode dark:border-tf-base-bg2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-tf-accent-emerald dark:bg-tf-accent-emerald mr-2"></div>
            <span className="text-sm text-tf-base-text-lmode dark:text-tf-base-text">Ready</span>
          </div>
          <div className="text-sm text-tf-base-subtext-lmode/60 dark:text-tf-base-subtext/60">
            Memory: 0 MB
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuntimePanel;
