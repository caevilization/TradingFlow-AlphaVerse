import React from 'react';
import { CircleUserRoundIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface AddressNodeProps extends NodeProps<TFNodeData> {}

const AddressNode: React.FC<AddressNodeProps> = props => {
  return <TFNode {...props} />;
};

export const addressNodeConfig: Partial<TFNodeData> = {
  icon: <CircleUserRoundIcon className="w-5 h-5 text-tf-accent-amber" />,
  title: 'Address',
  description: 'Your web3 address',
  nodeType: 'core',
  inputs: [
    {
      id: 'chain',
      title: 'Chain',
      type: 'select',
      inputType: 'select',
      required: true,
      value: 'ETH',
      options: [
        { value: 'BTC', label: 'Bitcoin' },
        { value: 'ETH', label: 'Ethereum' },
        { value: 'SOL', label: 'Solana' },
      ],
      handle: {
        color: 'amber',
      },
    },
    {
      id: 'address',
      title: 'Address',
      type: 'address',
      inputType: 'address',
      required: true,
      value: '',
      chainRef: 'chain', // 关联到 chain 输入
      handle: {
        color: 'amber',
      },
    },
  ],
  outputs: [
    {
      id: 'account',
      title: 'Account Info',
      type: 'object',
      handle: {
        color: 'amber',
      },
    },
  ],
};

export default AddressNode;
