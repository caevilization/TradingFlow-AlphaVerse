import React from 'react';
import { NewspaperIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface ForesightNewsNodeProps extends NodeProps<TFNodeData> {}

const ForesightNewsNode: React.FC<ForesightNewsNodeProps> = props => {
  return <TFNode {...props} />;
};

export const foresightNewsNodeConfig: Partial<TFNodeData> = {
  icon: <NewspaperIcon className="w-5 h-5 text-tf-accent-emerald" />,
  title: 'ForesightNews',
  description: 'Get news from ForesightNews',
  nodeType: 'news',
  inputs: [
    {
      id: 'category',
      title: 'Category',
      type: 'select',
      inputType: 'select',
      required: true,
      options: [
        { value: 'all', label: 'All News' },
        { value: 'defi', label: 'DeFi' },
        { value: 'nft', label: 'NFT' },
        { value: 'chain', label: 'Chain' },
        { value: 'regulation', label: 'Regulation' },
        { value: 'mining', label: 'Mining' },
      ],
      value: 'all',
      handle: {
        color: 'violet',
      },
    },
    {
      id: 'keywords',
      title: 'Keywords',
      type: 'text',
      inputType: 'text',
      placeholder: 'Enter keywords to filter news',
      handle: {
        color: 'violet',
      },
    },
    {
      id: 'limit',
      title: 'Limit',
      type: 'number',
      inputType: 'text',
      value: 10,
      placeholder: 'Enter limit (1-100)',
      handle: {
        color: 'violet',
      },
    },
    {
      id: 'language',
      title: 'Language',
      type: 'select',
      inputType: 'select',
      options: [
        { value: 'en', label: 'English' },
        { value: 'zh', label: 'Chinese' },
      ],
      value: 'en',
      handle: {
        color: 'violet',
      },
    },
  ],
  outputs: [
    {
      id: 'news',
      title: 'News List',
      type: 'multiselect',
      handle: {
        color: 'violet',
      },
    },
    {
      id: 'latest',
      title: 'Latest News',
      type: 'object',
      handle: {
        color: 'violet',
      },
    },
    {
      id: 'metadata',
      title: 'Feed Info',
      type: 'object',
      handle: {
        color: 'violet',
      },
    },
  ],
};

export default ForesightNewsNode;
