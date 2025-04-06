// Core Nodes
import AddressNode from './instances/trade/AddressNode';
import CodeNode from './instances/compute/CodeNode';
import DatasetNode from './instances/outputs/DatasetNode';

// Operation Nodes
import BuyNode from './instances/trade/BuyNode';
import SellNode from './instances/trade/SellNode';

// Bot Nodes
import AiModelNode from './instances/compute/AiModelNode';
import PromptNode from './instances/compute/PromptNode';

// Market Nodes
import BinancePriceNode from './instances/inputs/BinancePriceNode';

// News Nodes
import ForesightNewsNode from './instances/inputs/ForesightNewsNode';

// Media Nodes
import TwitterListenerNode from './instances/inputs/TwitterListenerNode';
import TelegramSenderNode from './instances/outputs/TelegramSenderNode';

// 节点组件映射
export const nodeComponents = {
  // Core Nodes
  address: AddressNode,
  code: CodeNode,
  dataset: DatasetNode,

  // Operation Nodes
  buy: BuyNode,
  sell: SellNode,

  // Bot Nodes
  'ai-model': AiModelNode,
  prompt: PromptNode,

  // Market Nodes
  'binance-price': BinancePriceNode,

  // News Nodes
  'foresight-news': ForesightNewsNode,

  // Media Nodes
  'x-listener': TwitterListenerNode,
  'telegram-sender': TelegramSenderNode,
} as const;
