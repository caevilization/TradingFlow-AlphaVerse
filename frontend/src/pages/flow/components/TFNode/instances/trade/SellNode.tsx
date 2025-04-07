import React from 'react';
import { TrendingDownIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface SellNodeProps extends NodeProps<TFNodeData> {}

const SellNode: React.FC<SellNodeProps> = props => {
  return <TFNode {...props} />;
};

export const sellNodeConfig: Partial<TFNodeData> = {
  icon: <TrendingDownIcon className="w-5 h-5 text-tf-accent-amber" />,
  title: 'Sell',
  description: 'Execute sell orders',
  nodeType: 'operation',
  inputs: [
    {
      id: 'symbol',
      title: 'Symbol',
      type: 'searchSelect',
      inputType: 'searchSelect',
      required: true,
      placeholder: 'Search trading pairs',
      options: [
        { value: 'BTC/USDT', label: 'BTC/USDT' },
        { value: 'ETH/USDT', label: 'ETH/USDT' },
        { value: 'BNB/USDT', label: 'BNB/USDT' },
        { value: 'SOL/USDT', label: 'SOL/USDT' },
        { value: 'XRP/USDT', label: 'XRP/USDT' },
      ],
      handle: {
        color: 'rose',
      },
    },
    {
      id: 'address',
      title: 'Address',
      type: 'text',
      inputType: 'text',
      required: true,
      placeholder: 'Enter wallet address',
      handle: {
        color: 'emerald',
      },
    },
    {
      id: 'amount',
      title: 'Amount',
      type: 'number',
      inputType: 'text',
      required: true,
      placeholder: 'Enter amount to sell',
      handle: {
        color: 'rose',
      },
    },
    {
      id: 'price',
      title: 'Price',
      type: 'number',
      inputType: 'text',
      placeholder: 'Enter price (for Limit orders)',
      handle: {
        color: 'rose',
      },
    },
  ],
  outputs: [
    {
      id: 'orderId',
      title: 'Order ID',
      type: 'text',
      handle: {
        color: 'rose',
      },
    },
    {
      id: 'status',
      title: 'Order Status',
      type: 'text',
      handle: {
        color: 'rose',
      },
    },
  ],
};

export default SellNode;
