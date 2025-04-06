import React, { useState, useRef, useEffect } from 'react';
import { Trash2, MoreHorizontal, FanIcon } from 'lucide-react';

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface MenuBarProps {
  isLocked: boolean;
  onAIGenerate: () => void;
  onDelete: () => void;
  extraMenuItems?: MenuItem[];
}

export const MenuBar: React.FC<MenuBarProps> = ({
  isLocked,
  onAIGenerate,
  onDelete,
  extraMenuItems = [],
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="flex items-center bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-lg overflow-hidden shadow-lg">
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => !isLocked && onAIGenerate()}
            className={`px-3 py-2 flex items-center gap-2 transition-all text-tf-accent-violet hover:bg-tf-accent-violet/10 ${
              isLocked ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            <FanIcon className="w-4 h-4 text-tf-accent-violet" />
            <span className="text-sm whitespace-nowrap">Zephyr AI</span>
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 flex items-center gap-2 transition-colors text-tf-accent-rose hover:bg-tf-accent-rose/10"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm whitespace-nowrap">Delete</span>
          </button>
        </div>
        {extraMenuItems.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-3 py-2 flex items-center gap-2 transition-colors text-tf-base-subtext hover:bg-tf-base-bg2/50"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-tf-base-bg1 border border-tf-base-bg2 rounded-lg shadow-lg overflow-hidden z-50">
                {extraMenuItems.map(item => (
                  <button
                    key={item.key}
                    onClick={() => {
                      item.onClick();
                      setShowDropdown(false);
                    }}
                    className="w-full px-3 py-2 flex items-center gap-2 transition-colors text-tf-base-subtext hover:bg-tf-base-bg2/50"
                  >
                    {item.icon}
                    <span className="text-sm whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
