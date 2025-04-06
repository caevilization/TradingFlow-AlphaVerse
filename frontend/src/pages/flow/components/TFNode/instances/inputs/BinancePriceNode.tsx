import React from 'react';
import { CandlestickChartIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface BinancePriceNodeProps extends NodeProps<TFNodeData> {}

const BinancePriceNode: React.FC<BinancePriceNodeProps> = (props) => {
  return <TFNode {...props} />;
};

export const binancePriceNodeConfig: Partial<TFNodeData> = {
  icon: <CandlestickChartIcon className="w-5 h-5 text-tf-accent-emerald" />,
  title: 'Binance Price',
  description: 'Get Binance market data',
  nodeType: 'market',
  isLocked: false,
  inputs: [
    {
      id: 'symbol',
      title: 'Symbol',
      type: 'text',
      inputType: 'text',
      required: true,
      placeholder: 'Enter trading pair (e.g. BTCUSDT)',
      handle: {
        color: 'amber'
      }
    },
    {
      id: 'interval',
      title: 'Interval',
      type: 'select',
      inputType: 'select',
      required: true,
      options: [
        { value: '1m', label: '1 minute' },
        { value: '5m', label: '5 minutes' },
        { value: '15m', label: '15 minutes' },
        { value: '1h', label: '1 hour' },
        { value: '4h', label: '4 hours' },
        { value: '1d', label: '1 day' }
      ],
      value: '1m',
      handle: {
        color: 'amber'
      }
    },
    {
      id: 'limit',
      title: 'Limit',
      type: 'number',
      inputType: 'text',
      value: 100,
      placeholder: 'Enter limit (1-1000)',
      handle: {
        color: 'amber'
      }
    }
  ],
  outputs: [
    {
      id: 'price',
      title: 'Current Price',
      type: 'number',
      handle: {
        color: 'amber'
      }
    },
    {
      id: 'klines',
      title: 'Kline Data',
      type: 'object',
      handle: {
        color: 'amber'
      }
    },
    {
      id: 'metadata',
      title: 'Market Info',
      type: 'object',
      handle: {
        color: 'amber'
      }
    }
  ]
};

export default BinancePriceNode;
