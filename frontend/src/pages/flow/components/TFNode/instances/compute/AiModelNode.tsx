import React from 'react';
import { BotIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface AiModelNodeProps extends NodeProps<TFNodeData> {}

const AiModelNode: React.FC<AiModelNodeProps> = props => {
  return <TFNode {...props} />;
};

export const aiModelNodeConfig: Partial<TFNodeData> = {
  icon: <BotIcon className="w-5 h-5 text-tf-accent-sky" />,
  title: 'AI Model',
  description: 'Run AI models',
  nodeType: 'bot',
  inputs: [
    {
      id: 'model',
      title: 'Model',
      type: 'select',
      inputType: 'select',
      required: true,
      options: [
        { value: 'gpt4', label: 'GPT-4' },
        { value: 'gpt35', label: 'GPT-3.5' },
        { value: 'claude', label: 'Claude' },
        { value: 'deepseek', label: 'DeepSeek' },
      ],
      value: 'gpt4',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'systemPrompt',
      title: 'System Prompt',
      type: 'paragraph',
      inputType: 'text',
      placeholder: 'Enter system prompt',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'prompt',
      title: 'Prompt',
      type: 'paragraph',
      inputType: 'text',
      required: true,
      placeholder: 'Enter prompt text',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'parameters',
      title: 'Parameters',
      type: 'paramMatrix',
      inputType: 'paramMatrix',
      value: [{
        id: 'param_1',
        name: 'Temperature',
        value: '0.7'
      }],
      handle: {
        color: 'sky',
      },
    },
  ],
  outputs: [
    {
      id: 'response',
      title: 'Response',
      type: 'text',
      handle: {
        color: 'sky',
      },
    },
    {
      id: 'tokens',
      title: 'Token Usage',
      type: 'object',
      handle: {
        color: 'sky',
      },
    },
  ],
};

export default AiModelNode;
