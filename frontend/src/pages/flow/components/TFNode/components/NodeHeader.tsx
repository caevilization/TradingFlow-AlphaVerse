import React from 'react';
import { Play, Check, X } from 'lucide-react';
import { nodeTypeColors } from '../constants';
import type { NodeType } from '../types';

interface NodeHeaderProps {
  icon?: React.ReactNode;
  title?: string;
  titleDiff?: {
    oldValue: string;
    newValue: string;
    preview?: boolean;
  };
  description?: string;
  descriptionDiff?: {
    oldValue: string;
    newValue: string;
    preview?: boolean;
  };
  nodeType?: NodeType;
  onRunOnce?: () => void;
  onAcceptDiff?: () => void;
  onRejectDiff?: () => void;
}

export const NodeHeader: React.FC<NodeHeaderProps> = ({
  icon,
  title,
  description,
  descriptionDiff,
  nodeType,
  onRunOnce,
  onAcceptDiff,
  onRejectDiff,
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      {/* Left Part */}
      <div className="flex items-center gap-2">
        {/* 图标 */}
        {icon && (
          <span className={nodeTypeColors[nodeType || 'default']}>{icon}</span>
        )}
        {/* 标题与描述 */}
        <div className="flex flex-col gap-1">
          {/* 标题 */}
          <span className="text-tf-base-text-lmode dark:text-tf-base-subtext font-medium">{title}</span>
          {/* 描述，支持 diff */}
          {(description || descriptionDiff?.preview) && (
            <div className="flex flex-col gap-2">
              {/* diff mode */}
              {descriptionDiff?.preview ? (
                <>
                  {/* Old Description */}
                  <div className="bg-tf-accent-rose/10 text-tf-base-bg1 dark:text-tf-base-white line-through rounded p-2 text-xs relative">
                    {description}
                  </div>
                  {/* New Description */}
                  <div className="flex flex-col">
                    <div className="bg-tf-accent-emerald/10 text-tf-base-bg1 dark:text-tf-base-white rounded p-2 text-xs">
                      {descriptionDiff.newValue}
                    </div>
                    {/* Diff Actions */}
                    <div className="flex items-center gap-1 pt-1">
                      <button
                        onClick={onAcceptDiff}
                        className="p-1 rounded bg-tf-accent-emerald/20 hover:bg-tf-accent-emerald/30 transition-colors"
                        title="Accept changes"
                      >
                        <Check className="w-3.5 h-3.5 text-tf-accent-emerald" />
                      </button>
                      <button
                        onClick={onRejectDiff}
                        className="p-1 rounded bg-tf-accent-rose/20 hover:bg-tf-accent-rose/30 transition-colors"
                        title="Reject changes"
                      >
                        <X className="w-3.5 h-3.5 text-tf-accent-rose" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // normal mode
                <span className="text-xs text-tf-base-subtext-lmode">{description}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Part */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRunOnce}
          className="p-1 rounded hover:bg-tf-base-bg2/50 transition-colors"
          title="Run Once"
        >
          <Play className="w-4 h-4 text-tf-base-subtext hover:text-tf-accent-primary transition-colors" />
        </button>
      </div>
    </div>
  );
};
