import React from 'react';
import { MessageSquareIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface PromptNodeProps extends NodeProps<TFNodeData> {}

const PromptNode: React.FC<PromptNodeProps> = (props) => {
  return <TFNode {...props} />;
};

export const promptNodeConfig: Partial<TFNodeData> = {
  icon: <MessageSquareIcon className="w-5 h-5 text-tf-accent-sky" />,
  title: 'Prompt',
  description: 'Generate content with AI',
  nodeType: 'bot',
  inputs: [
    {
      id: 'task',
      title: 'Task',
      type: 'select',
      inputType: 'select',
      required: true,
      options: [
        { value: 'market_analysis', label: 'Market Analysis' },
        { value: 'sentiment_analysis', label: 'Sentiment Analysis' },
        { value: 'news_summary', label: 'News Summary' },
        { value: 'custom', label: 'Custom Task' }
      ],
      value: 'market_analysis',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'prompt',
      title: 'Prompt Template',
      type: 'paragraph',
      inputType: 'text',
      required: true,
      placeholder: 'Enter prompt template with {variables}',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'variables',
      title: 'Variables',
      type: 'object',
      inputType: 'object',
      placeholder: '{"variable": "value"}',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'context',
      title: 'Context',
      type: 'paragraph',
      inputType: 'text',
      placeholder: 'Additional context for the prompt',
      handle: {
        color: 'violet'
      }
    }
  ],
  outputs: [
    {
      id: 'prompt',
      title: 'Generated Prompt',
      type: 'text',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'variables',
      title: 'Used Variables',
      type: 'object',
      handle: {
        color: 'violet'
      }
    }
  ]
};

export default PromptNode;
