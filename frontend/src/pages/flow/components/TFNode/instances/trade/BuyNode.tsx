import React from 'react';
import { TrendingUpIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface BuyNodeProps extends NodeProps<TFNodeData> {}

const BuyNode: React.FC<BuyNodeProps> = props => {
  return <TFNode {...props} />;
};

export const buyNodeConfig: Partial<TFNodeData> = {
  icon: <TrendingUpIcon className="w-5 h-5 text-tf-accent-amber" />,
  title: 'Buy',
  description: 'Execute buy orders',
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
        color: 'emerald',
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
      placeholder: 'Enter amount to buy',
      handle: {
        color: 'emerald',
      },
    },
    {
      id: 'price',
      title: 'Price',
      type: 'number',
      inputType: 'text',
      placeholder: 'Enter price (for Limit orders)',
      handle: {
        color: 'emerald',
      },
    },
  ],
  outputs: [
    {
      id: 'orderId',
      title: 'Order ID',
      type: 'text',
      handle: {
        color: 'emerald',
      },
    },
    {
      id: 'status',
      title: 'Order Status',
      type: 'text',
      handle: {
        color: 'emerald',
      },
    },
  ],
};

export default BuyNode;
