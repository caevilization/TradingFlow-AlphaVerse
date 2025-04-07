import React, { useRef, useState } from 'react';
import { XCircle } from 'lucide-react';

interface AIPromptInputProps {
  aiPrompt: string;
  isLocked: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const AIPromptInput: React.FC<AIPromptInputProps> = ({
  aiPrompt,
  isLocked,
  onClose,
  onChange,
  onSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLocked) {
      e.preventDefault();
      e.stopPropagation();
      setIsSubmitted(true);
      await onSubmit();
      setIsDone(true);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-lg overflow-hidden shadow-lg p-2 gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={aiPrompt}
            onChange={e => !isLocked && onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLocked}
            placeholder="Enter your prompt..."
            className={`
              flex-1 bg-transparent border-none focus:outline-none
              ${
                isSubmitted
                  ? 'text-tf-base-subtext-lmode/75 dark:text-tf-base-subtext/75'
                  : 'text-tf-base-subtext-lmode dark:text-tf-base-subtext'
              }
              placeholder-tf-base-subtext-lmode/50 dark:placeholder-tf-base-subtext/50 disabled:cursor-not-allowed
            `}
          />
          {isSubmitted && (
            <div className="flex items-center gap-2">
              {!isDone ? (
                <div className="animate-pulse px-2 py-1 bg-tf-accent-violet/20 rounded text-xs text-tf-accent-violet">
                  Generating...
                </div>
              ) : (
                <div className="px-2 py-1 bg-tf-accent-emerald/20 rounded text-xs text-tf-accent-emerald">
                  Done
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 rounded transition-colors"
        >
          <XCircle className="w-4 h-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
        </button>
      </div>
    </div>
  );
};
