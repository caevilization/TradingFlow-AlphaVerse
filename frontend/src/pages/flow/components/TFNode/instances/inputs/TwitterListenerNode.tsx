import React from 'react';
import { TabletSmartphoneIcon, TwitterIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface TwitterListenerNodeProps extends NodeProps<TFNodeData> {}

const TwitterListenerNode: React.FC<TwitterListenerNodeProps> = props => {
  return <TFNode {...props} />;
};

export const twitterListenerNodeConfig: Partial<TFNodeData> = {
  icon: <TwitterIcon className="w-5 h-5 text-tf-accent-emerald" />,
  title: 'Twitter Listener',
  description: 'Monitor Twitter feeds',
  nodeType: 'media',
  inputs: [
    {
      id: 'accounts',
      title: 'Accounts',
      type: 'multiselect',
      inputType: 'text',
      required: true,
      placeholder: 'Enter Twitter accounts to monitor',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'keywords',
      title: 'Keywords',
      type: 'multiselect',
      inputType: 'text',
      placeholder: 'Enter keywords to filter tweets',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'interval',
      title: 'Check Interval',
      type: 'number',
      inputType: 'text',
      value: 60,
      placeholder: 'Enter interval (30-3600 seconds)',
      description: 'Interval in seconds',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'language',
      title: 'Language',
      type: 'select',
      inputType: 'select',
      options: [
        { value: 'all', label: 'All Languages' },
        { value: 'en', label: 'English' },
        { value: 'zh', label: 'Chinese' },
      ],
      value: 'all',
      handle: {
        color: 'sky',
      },
    },
  ],
  outputs: [
    {
      id: 'tweets',
      title: 'New Tweets',
      type: 'multiselect',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'latest',
      title: 'Latest Tweet',
      type: 'object',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'metadata',
      title: 'Monitor Info',
      type: 'object',
      handle: {
        color: 'sky',
      },
    },
  ],
};

export default TwitterListenerNode;
