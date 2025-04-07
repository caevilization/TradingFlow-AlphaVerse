import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Menu } from '@headlessui/react';
import { formatCurrency } from '../../../utils/format';

interface FlowFundThumbnailProps {
  id: number;
  title: string;
  creator: {
    name: string;
    avatar: string;
  };
  investors: Array<{
    name: string;
    avatar: string;
  }>;
  metrics: {
    roi: number; // Return on Investment
    tvl: number; // Total Value Locked
    carry: number; // Carry percentage (0-100)
  };
  previewImage: string;
  onInvest?: () => void;
  onDetail?: () => void;
  onWithdraw?: () => void;
}

const FlowFundThumbnail: React.FC<FlowFundThumbnailProps> = ({
  id,
  title,
  creator,
  investors,
  metrics,
  previewImage,
  onInvest,
  onDetail,
  onWithdraw,
}) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/flow/${id}`);
    onDetail?.();
  };

  return (
    <div className="bg-white dark:bg-tf-base-bg2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex p-4 gap-4">
        {/* Flow Preview Image */}
        <div className="w-2/3 relative group cursor-pointer" onClick={handleDetail}>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={previewImage}
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Base overlay */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* View details button */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>View details</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="w-1/3 flex flex-col justify-center gap-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    metrics.roi > 30 ? 'bg-green-400' : 'bg-gray-400'
                  }`}
                ></div>
                <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">ROI</span>
              </div>
              <span
                className={`font-semibold text-lg ${
                  metrics.roi > 30
                    ? 'text-green-500 dark:text-green-400'
                    : 'text-tf-base-text-lmode dark:text-tf-base-text'
                }`}
              >
                {metrics.roi >= 0 ? '+' : ''}
                {metrics.roi.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    metrics.tvl > 1000000 ? 'bg-blue-400' : 'bg-gray-400'
                  }`}
                ></div>
                <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">TVL</span>
              </div>
              <span
                className={`font-semibold text-lg ${
                  metrics.tvl > 1000000
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-tf-base-text-lmode dark:text-tf-base-text'
                }`}
              >
                {formatCurrency(metrics.tvl)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-tf-base-bg2-lmode/30 dark:bg-tf-base-bg2/30 rounded-lg hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 transition-colors">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    metrics.carry < 20 ? 'bg-purple-400' : 'bg-gray-400'
                  }`}
                ></div>
                <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext">Carry</span>
              </div>
              <span
                className={`font-semibold text-lg ${
                  metrics.carry < 20
                    ? 'text-purple-500 dark:text-purple-400'
                    : 'text-tf-base-text-lmode dark:text-tf-base-text'
                }`}
              >
                {metrics.carry}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-tf-base-bg1-lmode/5 dark:bg-tf-base-bg1/5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-tf-base-text-lmode dark:text-tf-base-text">
            {title}
          </h3>
          <Menu as="div" className="relative">
            <Menu.Button className="p-1 rounded-lg hover:bg-tf-base-bg2-lmode dark:hover:bg-tf-base-bg2 transition-colors">
              <MoreHorizontal className="w-5 h-5 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-1 w-40 bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-lg shadow-lg py-1 z-50">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onWithdraw}
                    className={`${
                      active ? 'bg-tf-base-bg2-lmode dark:bg-tf-base-bg2' : ''
                    } block w-full text-left px-4 py-2 text-sm text-tf-base-text-lmode dark:text-tf-base-text`}
                  >
                    Withdraw
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Creator */}
            <div className="flex items-center space-x-2">
              <img src={creator.avatar} alt={creator.name} className="w-6 h-6 rounded-full" />
              <span className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext">
                {creator.name}
              </span>
            </div>

            {/* Investors */}
            <div className="flex -space-x-2">
              {investors.slice(0, 3).map((investor, index) => (
                <img
                  key={index}
                  src={investor.avatar}
                  alt={investor.name}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-tf-base-bg2"
                  title={investor.name}
                />
              ))}
              {investors.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-tf-base-bg2-lmode dark:bg-tf-base-bg2 flex items-center justify-center text-xs text-tf-base-subtext-lmode dark:text-tf-base-subtext border-2 border-white dark:border-tf-base-bg2">
                  +{investors.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDetail}
              className="px-3 py-1 text-sm font-medium rounded-lg border border-tf-base-bg2-lmode dark:border-tf-base-bg2 text-tf-base-text-lmode dark:text-tf-base-text hover:bg-tf-base-bg2-lmode dark:hover:bg-tf-base-bg2 transition-colors"
            >
              Detail
            </button>
            <button
              onClick={onInvest}
              className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to rounded-lg hover:opacity-90 transition-opacity"
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowFundThumbnail;
