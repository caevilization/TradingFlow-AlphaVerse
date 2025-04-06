import React, { useState } from 'react';
import {
  AppWindowIcon,
  BotIcon,
  NewspaperIcon,
  SearchIcon,
  CodeIcon,
  DatabaseIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  XIcon,
  TabletSmartphoneIcon,
  SendIcon,
  ScaleIcon,
  TerminalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CandlestickChartIcon,
  CircleUserRoundIcon,
  FolderInputIcon,
  FolderOutputIcon,
  CpuIcon,
  MessageSquareIcon,
  TwitterIcon,
} from 'lucide-react';

interface ComponentCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  items: { id: string; name: string; description: string; icon: React.ReactNode }[];
}

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  // {
  //   name: 'Core',
  //   icon: <AppWindowIcon className="w-[18px] h-[18px]" />,
  //   color: 'text-tf-base-subtext-lmode dark:text-tf-base-subtext',
  //   items: [

  //   ],
  // },
  {
    name: 'Trade',
    icon: <ScaleIcon className="w-[18px] h-[18px]" />,
    color: 'text-tf-base-subtext-lmode dark:text-tf-base-subtext',
    items: [
      {
        id: 'address',
        name: 'Address',
        description: 'Your web3 address',
        icon: <CircleUserRoundIcon className="w-[18px] h-[18px] text-tf-accent-amber" />,
      },
      {
        id: 'buy',
        name: 'Buy',
        description: 'Execute buy orders',
        icon: <TrendingUpIcon className="w-[18px] h-[18px] text-tf-accent-amber" />,
      },
      {
        id: 'sell',
        name: 'Sell',
        description: 'Execute sell orders',
        icon: <TrendingDownIcon className="w-[18px] h-[18px] text-tf-accent-amber" />,
      },
    ],
  },
  {
    name: 'Compute',
    icon: <CpuIcon className="w-[18px] h-[18px]" />,
    color: 'text-tf-base-subtext-lmode dark:text-tf-base-subtext',
    items: [
      {
        id: 'ai-model',
        name: 'AI Model',
        description: 'Run AI model',
        icon: <BotIcon className="w-[18px] h-[18px] text-tf-accent-sky" />,
      },
      {
        id: 'code',
        name: 'Code',
        description: 'Execute custom code',
        icon: <CodeIcon className="w-[18px] h-[18px] text-tf-accent-sky" />,
      },
      {
        id: 'prompt',
        name: 'Prompt',
        description: 'Generate content with AI',
        icon: <MessageSquareIcon className="w-[18px] h-[18px] text-tf-accent-sky" />,
      },
    ],
  },

  // 目前的组件设计，将下面三类内部元素都放在一起，并且称之为 'Inputs'；另一部分输出的称之为 'Outputs'
  {
    name: 'Inputs',
    icon: <FolderInputIcon className="w-[18px] h-[18px]" />,
    color: 'text-tf-base-subtext-lmode dark:text-tf-base-subtext',
    items: [
      {
        id: 'binance-price',
        name: 'Binance Pricer',
        description: 'Get Binance market data',
        icon: (
          <div className="relative">
            <CandlestickChartIcon className="w-[18px] h-[18px] text-tf-accent-emerald" />
            <img
              src="/binance.svg"
              className="w-[10px] h-[10px] absolute -bottom-0.5 -right-0.5 dark:invert-[0.85]"
            />
          </div>
        ),
      },
      {
        id: 'foresight-news',
        name: 'ForesightNews',
        description: 'Get news from ForesightNews',
        icon: (
          <div className="relative">
            <NewspaperIcon className="w-[18px] h-[18px] text-tf-accent-emerald" />
            <img
              src="/foresight.jpeg"
              className="w-[10px] h-[10px] absolute -bottom-0.5 -right-0.5 dark:invert-[0.85] rounded-full"
            />
          </div>
        ),
      },
      {
        id: 'x-listener',
        name: 'X Listener',
        description: 'Monitor X feeds',
        icon: <TwitterIcon className="w-[18px] h-[18px] text-tf-accent-emerald" />,
      },
      {
        id: 'dataset',
        name: 'Dataset',
        description: 'Manage data collections',
        icon: <DatabaseIcon className="w-[18px] h-[18px] text-tf-accent-emerald" />,
      },
    ],
  },
  {
    name: 'Outputs',
    icon: <FolderOutputIcon className="w-[18px] h-[18px]" />,
    color: 'text-tf-base-subtext-lmode dark:text-tf-base-subtext',
    items: [
      {
        id: 'telegram-sender',
        name: 'Telegram Sender',
        description: 'Send Telegram messages',
        icon: <SendIcon className="w-[18px] h-[18px] text-tf-accent-rose" />,
      },
      {
        id: 'dataset',
        name: 'Dataset',
        description: 'Manage data collections',
        icon: <DatabaseIcon className="w-[18px] h-[18px] text-tf-accent-rose" />,
      },
    ],
  },
  // 未来的设计：News、Media、Market
];

const ComponentsPanel: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredCategories = COMPONENT_CATEGORIES.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.items.length > 0);

  /**
   * 渲染组件面板
   * @returns {JSX.Element}
   */
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* 搜索框 */}
      <div className="p-2 border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2">
        <div className="relative">
          {/* 搜索框input */}
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-tf-base-bg1 text-tf-base-text-lmode dark:text-tf-base-text rounded-md pl-8 pr-4 py-1.5 text-sm
              border border-tf-base-bg2-lmode dark:border-tf-base-bg2
              focus:outline-none focus:ring-1 focus:ring-tf-accent-primary-light dark:focus:ring-tf-accent-primary
              focus:border-tf-accent-primary-light dark:focus:border-tf-accent-primary
              placeholder:text-tf-base-subtext-lmode dark:placeholder:text-tf-base-subtext
              hover:border-tf-base-bg2-lmode/80 dark:hover:border-tf-base-bg2/80
              transition-colors duration-200"
          />
          {/* 搜索框图标 */}
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
        </div>
      </div>

      {/* 组件分类 */}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map(category => (
          <div
            key={category.name}
            className="border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2 last:border-b-0"
          >
            {/* 分类头 */}
            <div
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-tf-base-bg2-lmode/20 dark:hover:bg-tf-base-bg2/20 transition-colors duration-200"
              onClick={() => toggleCategory(category.name)}
            >
              {/* 分类图标 */}
              <div className={`mr-2 ${category.color}`}>{category.icon}</div>
              {/* 分类名称 */}
              <span className="text-sm font-medium text-tf-base-text-lmode dark:text-tf-base-text">
                {category.name}
              </span>
              {/* 展开/折叠按钮 */}
              <div className="ml-auto">
                {expandedCategories.includes(category.name) ? (
                  <ChevronDownIcon className="w-4 h-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
                ) : (
                  <ChevronUpIcon className="w-4 h-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
                )}
              </div>
            </div>
            {/* 展开的组件列表 */}
            {expandedCategories.includes(category.name) && (
              <div className="py-1">
                {category.items.map(item => (
                  <div
                    key={item.id}
                    className="px-6 py-2 hover:bg-tf-base-bg2-lmode/20 dark:hover:bg-tf-base-bg2/20 cursor-grab transition-colors duration-200 group"
                    draggable
                    onDragStart={e => {
                      e.dataTransfer.setData('application/reactflow', item.id);
                      e.dataTransfer.effectAllowed = 'copy';
                      e.currentTarget.classList.add('opacity-50');
                    }}
                    onDragEnd={e => {
                      e.currentTarget.classList.remove('opacity-50');
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {/* 组件图标 */}
                      <div className="flex-shrink-0">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        {/* 组件名称 */}
                        <div className="text-sm text-tf-base-text-lmode dark:text-tf-base-text group-hover:text-tf-base-text-lmode/80 dark:group-hover:text-tf-base-text/80 truncate">
                          {item.name}
                        </div>
                        {/* 组件描述 */}
                        <div className="text-xs text-tf-base-subtext-lmode dark:text-tf-base-subtext mt-0.5 group-hover:text-tf-base-subtext-lmode/80 dark:group-hover:text-tf-base-subtext/80 truncate">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsPanel;
