import React from 'react';
import { SendIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface TelegramSenderNodeProps extends NodeProps<TFNodeData> {}

const TelegramSenderNode: React.FC<TelegramSenderNodeProps> = (props) => {
  return <TFNode {...props} />;
};

export const telegramSenderNodeConfig: Partial<TFNodeData> = {
  icon: <SendIcon className="w-5 h-5 text-tf-accent-rose" />,
  title: 'Telegram Sender',
  description: 'Send Telegram messages',
  nodeType: 'media',
  inputs: [
    {
      id: 'chatId',
      title: 'Chat ID',
      type: 'text',
      inputType: 'text',
      required: true,
      placeholder: 'Enter Telegram chat ID',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'message',
      title: 'Message',
      type: 'paragraph',
      inputType: 'text',
      required: true,
      placeholder: 'Enter message to send',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'parseMode',
      title: 'Parse Mode',
      type: 'select',
      inputType: 'select',
      options: [
        { value: 'text', label: 'Plain Text' },
        { value: 'markdown', label: 'Markdown' },
        { value: 'html', label: 'HTML' }
      ],
      value: 'text',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'silent',
      title: 'Silent',
      type: 'select',
      inputType: 'select',
      value: 'false',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ],
      description: 'Send message silently',
      handle: {
        color: 'violet'
      }
    }
  ],
  outputs: [
    {
      id: 'messageId',
      title: 'Message ID',
      type: 'text',
      handle: {
        color: 'violet'
      }
    },
    {
      id: 'status',
      title: 'Send Status',
      type: 'object',
      handle: {
        color: 'violet'
      }
    }
  ]
};

export default TelegramSenderNode;
