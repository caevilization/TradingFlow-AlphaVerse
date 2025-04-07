import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ComponentsPanel from './ComponentsPanel';
import RuntimePanel from './RuntimePanel';
import StatisticsPanel from './StatisticsPanel';

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

const tabs: Tab[] = [
  {
    key: 'components',
    label: 'Components',
    content: <ComponentsPanel />,
  },
  {
    key: 'runtime',
    label: 'Runtime',
    content: <RuntimePanel />,
  },
  {
    key: 'statistics',
    label: 'Statistics',
    content: <StatisticsPanel />,
  },
];

const MIN_WIDTH = 240;
const DEFAULT_WIDTH = 300;
const COLLAPSE_THRESHOLD = 200;
const getMaxWidth = () => Math.min(600, window.innerWidth * 0.4);

const SidePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [lastWidth, setLastWidth] = useState(DEFAULT_WIDTH);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const maxWidth = getMaxWidth();
      const newWidth = Math.min(maxWidth, e.clientX);
      
      if (newWidth < COLLAPSE_THRESHOLD) {
        handleCollapse();
        setIsResizing(false);
        return;
      }
      
      const finalWidth = Math.max(MIN_WIDTH, newWidth);
      setWidth(finalWidth);
      setLastWidth(finalWidth);
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleCollapse = () => {
    if (isCollapsed) {
      setWidth(lastWidth);
    } else {
      setLastWidth(width);
      setWidth(0);
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`relative h-full bg-tf-base-bg1-lmode dark:bg-tf-base-bg1 border-r border-tf-base-bg2-lmode dark:border-tf-base-bg2 flex flex-col shadow-lg shadow-tf-accent-primary/5 dark:shadow-tf-accent-primary/10 transition-all duration-300 ${isResizing ? 'select-none' : ''}`}
      style={{ width: isCollapsed ? '24px' : width }}
      onMouseEnter={() => document.body.style.cursor = 'default'}
      onMouseLeave={() => document.body.style.cursor = 'default'}
    >
      {/* Collapse button */}
      <div
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer group transition-transform duration-300"
        onClick={handleCollapse}
      >
        <div className="w-6 h-6 rounded-full bg-tf-base-bg1-lmode dark:bg-tf-base-bg1 border border-tf-accent-primary hover:border-tf-accent-amber dark:border-tf-accent-primary dark:hover:border-tf-accent-amber flex items-center justify-center transition-all duration-300 hover:scale-105">
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4 text-tf-accent-primary dark:text-tf-accent-primary group-hover:text-tf-accent-amber transition-colors duration-300" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4 text-tf-accent-primary dark:text-tf-accent-primary group-hover:text-tf-accent-amber transition-colors duration-300" />
          )}
        </div>
      </div>

      {/* Resize handle */}
      <div
        className={`absolute right-0 top-0 w-1 h-full cursor-col-resize transition-all duration-300 group-hover:w-2
          ${isResizing ? 'bg-gradient-to-r from-tf-gradient-1-from/50 to-tf-gradient-1-to/50' : 'hover:bg-gradient-to-r hover:from-tf-gradient-1-from/30 hover:to-tf-gradient-1-to/30'}`}
        onMouseDown={handleMouseDown}
      />

      {/* Panel content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 h-full flex flex-col">
            {/* Tab Bar */}
            <div className="flex border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2 bg-gradient-to-r from-transparent via-tf-gradient-1-from/5 to-transparent relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-tf-accent-primary/20 after:to-transparent shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative
                    ${activeTab === tab.key
                      ? 'text-tf-accent-amber dark:text-tf-accent-primary'
                      : 'text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-amber dark:hover:text-tf-accent-primary'}
                    ${activeTab === tab.key
                      ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-tf-gradient-1-from after:to-tf-gradient-1-to'
                      : 'after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 hover:after:w-full hover:after:left-0 after:bg-gradient-to-r after:from-tf-gradient-1-from/50 after:to-tf-gradient-1-to/50 after:transition-all after:duration-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-track-tf-base-bg2-lmode/30 dark:scrollbar-track-tf-base-bg2/30 scrollbar-thumb-tf-accent-primary/50 dark:scrollbar-thumb-tf-accent-primary/50 hover:scrollbar-thumb-tf-accent-amber/50 dark:hover:scrollbar-thumb-tf-accent-amber/50">
              {tabs.find(tab => tab.key === activeTab)?.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
