// Core Nodes
import { addressNodeConfig } from './instances/trade/AddressNode';
import { codeNodeConfig } from './instances/compute/CodeNode';
import { datasetNodeConfig } from './instances/outputs/DatasetNode';

// Operation Nodes
import { buyNodeConfig } from './instances/trade/BuyNode';
import { sellNodeConfig } from './instances/trade/SellNode';

// Bot Nodes
import { aiModelNodeConfig } from './instances/compute/AiModelNode';
import { promptNodeConfig } from './instances/compute/PromptNode';

// Market Nodes
import { binancePriceNodeConfig } from './instances/inputs/BinancePriceNode';

// News Nodes
import { foresightNewsNodeConfig } from './instances/inputs/ForesightNewsNode';

// Media Nodes
import { twitterListenerNodeConfig } from './instances/inputs/TwitterListenerNode';
import { telegramSenderNodeConfig } from './instances/outputs/TelegramSenderNode';

// 节点配置映射
export const nodeConfigs = {
  // Core Nodes
  address: addressNodeConfig,
  code: codeNodeConfig,
  dataset: datasetNodeConfig,

  // Operation Nodes
  buy: buyNodeConfig,
  sell: sellNodeConfig,

  // Bot Nodes
  'ai-model': aiModelNodeConfig,
  prompt: promptNodeConfig,

  // Market Nodes
  'binance-price': binancePriceNodeConfig,

  // News Nodes
  'foresight-news': foresightNewsNodeConfig,

  // Media Nodes
  'x-listener': twitterListenerNodeConfig,
  'telegram-sender': telegramSenderNodeConfig,
} as const;

// 导出所有节点配置，用于 ComponentsPanel
export const nodeTypes = {
  // Core Nodes
  addressNode: addressNodeConfig,
  codeNode: codeNodeConfig,
  datasetNode: datasetNodeConfig,

  // Operation Nodes
  buyNode: buyNodeConfig,
  sellNode: sellNodeConfig,

  // Bot Nodes
  aiModelNode: aiModelNodeConfig,
  promptNode: promptNodeConfig,

  // Market Nodes
  binancePriceNode: binancePriceNodeConfig,

  // News Nodes
  foresightNewsNode: foresightNewsNodeConfig,

  // Media Nodes
  twitterListenerNode: twitterListenerNodeConfig,
  telegramSenderNode: telegramSenderNodeConfig,
} as const;
