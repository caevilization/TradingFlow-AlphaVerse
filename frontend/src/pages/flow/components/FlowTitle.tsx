import React, { useState, useRef, useEffect } from 'react';

interface FlowTitleProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  saveState: 'saved' | 'saving';
}

const FlowTitle: React.FC<FlowTitleProps> = ({ title, onTitleChange, saveState }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    if (editValue.trim()) {
      onTitleChange(editValue);
    } else {
      setEditValue(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditValue(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className="
            bg-transparent
            text-tf-base-text-lmode dark:text-tf-base-text
            border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2
            focus:border-tf-accent-violet dark:focus:border-tf-accent-violet
            outline-none
            font-medium
            w-48
            text-base
          "
        />
      ) : (
        <h1
          onClick={() => setIsEditing(true)}
          className="
            font-medium
            text-tf-base-text-lmode dark:text-tf-base-text
            cursor-pointer
            hover:text-tf-accent-violet dark:hover:text-tf-accent-violet
            transition-colors
          "
        >
          {title}
        </h1>
      )}
      <span
        className={`
          text-sm transition-all duration-300
          ${saveState === 'saved' ? 'text-green-500' : ''}
          ${saveState === 'saving' ? 'text-yellow-500' : ''}
        `}
      >
        {saveState === 'saved' && '(Saved)'}
        {saveState === 'saving' && '(Saving...)'}
      </span>
    </div>
  );
};

export default FlowTitle;
