import React from 'react';
import { X, Check } from 'lucide-react';

interface DiffActionsProps {
  isLocked: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export const DiffActions: React.FC<DiffActionsProps> = ({
  isLocked,
  onAcceptAll,
  onRejectAll,
}) => {
  return (
    <div className="flex items-center gap-2 p-1 bg-white dark:bg-tf-base-bg1 rounded-lg border-2 border-tf-base-bg2-lmode dark:border-tf-base-bg2 shadow-lg z-10 hover:border-tf-accent-primary transition-colors">
      {/* <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-tf-accent-primary/10 text-tf-accent-primary text-xs rounded-full">
        Changes Available
      </div> */}
      <button
        onClick={onAcceptAll}
        className="flex items-center gap-1.5 px-3 py-1.5 text-tf-accent-emerald hover:bg-tf-accent-emerald/10 rounded transition-colors"
        disabled={isLocked}
      >
        <Check className="w-4 h-4" />
        <span className="text-sm font-medium whitespace-nowrap">Accept All</span>
      </button>
      <div className="w-px h-6 bg-tf-base-bg2-lmode/20 dark:bg-tf-base-bg2/20" />
      <button
        onClick={onRejectAll}
        className="flex items-center gap-1.5 px-3 py-1.5 text-tf-accent-rose hover:bg-tf-accent-rose/10 rounded transition-colors"
        disabled={isLocked}
      >
        <X className="w-4 h-4" />
        <span className="text-sm font-medium whitespace-nowrap">Reject All</span>
      </button>
    </div>
  );
};
