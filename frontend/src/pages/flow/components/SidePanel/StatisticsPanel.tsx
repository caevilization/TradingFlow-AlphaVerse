import React from 'react';
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color,
}) => (
  <div className="p-3 rounded-lg bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 hover:border-tf-base-bg2-lmode/80 dark:hover:border-tf-base-bg2/80 transition-colors duration-200">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-sm text-tf-base-subtext-lmode/60 dark:text-tf-base-subtext/60">
          {title}
        </div>
        <div className="mt-1 text-lg font-semibold text-tf-base-text-lmode dark:text-tf-base-text">
          {value}
        </div>
      </div>
      <div className={`p-2 rounded-md ${color} bg-current bg-opacity-10`}>
        <Icon className="w-5 h-5 text-tf-base-text-lmode dark:text-tf-base-text" />
      </div>
    </div>
    <div className="mt-2 flex items-center">
      <div
        className={`text-sm ${
          isPositive
            ? 'text-tf-accent-emerald dark:text-tf-accent-emerald'
            : 'text-tf-accent-rose dark:text-tf-accent-rose'
        }`}
      >
        {change}
      </div>
      <div className="ml-2 text-xs text-tf-base-subtext-lmode/60 dark:text-tf-base-subtext/60">
        vs last period
      </div>
    </div>
  </div>
);

const stats: StatCardProps[] = [
  {
    title: 'Total Value',
    value: '$12,345.67',
    change: '+249.5%',
    isPositive: true,
    icon: CurrencyDollarIcon,
    color: 'text-tf-accent-emerald dark:text-tf-accent-emerald',
  },
  {
    title: 'ROI',
    value: '273.8%',
    change: '+159.2%',
    isPositive: true,
    icon: ArrowTrendingUpIcon,
    color: 'text-tf-accent-sky dark:text-tf-accent-sky',
  },
  {
    title: 'Win Rate',
    value: '81.5%',
    change: '-1.2%',
    isPositive: false,
    icon: ScaleIcon,
    color: 'text-tf-accent-violet dark:text-tf-accent-violet',
  },
  {
    title: 'Avg Hold Time',
    value: '10.5 Days',
    change: '+3.5 Days',
    isPositive: true,
    icon: ClockIcon,
    color: 'text-tf-accent-amber dark:text-tf-accent-amber',
  },
];

const StatisticsPanel: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="grid grid-cols-1 gap-4">
        {stats.map(stat => (
          <StatCard key={stat.title} {...stat} />
        ))}

        {/* Chart placeholder */}
        <div className="mt-4 p-3 rounded-lg bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 hover:border-tf-base-bg2-lmode/80 dark:hover:border-tf-base-bg2/80 transition-colors duration-200 h-64 flex items-center justify-center">
          <span className="text-tf-base-subtext-lmode/60 dark:text-tf-base-subtext/60">
            Performance Chart Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
