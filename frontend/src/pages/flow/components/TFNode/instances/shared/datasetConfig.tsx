import React from 'react';
import { DatabaseIcon } from 'lucide-react';
import { TFNodeData, TFInput, TFOutput } from '../../types';

export const createDatasetNodeConfig = (isInput: boolean): Partial<TFNodeData> => {
  const inputs: TFInput[] = isInput ? [] : [
    {
      id: 'data',
      title: 'Data',
      type: 'object',
      inputType: 'object',
      required: true,
      handle: {
        color: 'rose'
      }
    },
    {
      id: 'name',
      title: 'Name',
      type: 'text',
      inputType: 'text',
      required: true,
      placeholder: 'Enter dataset name',
      handle: {
        color: 'rose'
      }
    }
  ];

  const outputs: TFOutput[] = isInput ? [
    {
      id: 'data',
      title: 'Data',
      type: 'object',
      handle: {
        color: 'emerald'
      }
    }
  ] : [];

  return {
    icon: <DatabaseIcon className={`w-5 h-5 ${isInput ? 'text-tf-accent-emerald' : 'text-tf-accent-rose'}`} />,
    title: 'Dataset',
    description: isInput ? 'Load dataset from storage' : 'Save dataset to storage',
    nodeType: 'core',
    inputs,
    outputs
  };
};
