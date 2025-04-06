import React from 'react';
import { CodeIcon } from 'lucide-react';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { NodeProps } from 'reactflow';

interface CodeNodeProps extends NodeProps<TFNodeData> {}

const CodeNode: React.FC<CodeNodeProps> = (props) => {
  return <TFNode {...props} />;
};

export const codeNodeConfig: Partial<TFNodeData> = {
  icon: <CodeIcon className="w-5 h-5 text-tf-accent-sky" />,
  title: 'Code',
  description: 'Execute custom code',
  nodeType: 'core',
  inputs: [
    {
      id: 'code',
      title: 'Python Code',
      type: 'paragraph',
      inputType: 'text',
      placeholder: 'Enter Python code',
      handle: {
        color: 'sky'
      }
    },
    {
      id: 'requirements',
      title: 'Requirements',
      type: 'text',
      inputType: 'text',
      placeholder: 'Enter required packages',
      handle: {
        color: 'sky'
      }
    },
    {
      id: 'timeout',
      title: 'Timeout (s)',
      type: 'number',
      inputType: 'text',
      value: 30,
      handle: {
        color: 'sky'
      }
    }
  ],
  outputs: [
    {
      id: 'result',
      title: 'Execution Result',
      type: 'text',
      handle: {
        color: 'sky'
      }
    },
    {
      id: 'logs',
      title: 'Execution Logs',
      type: 'text',
      handle: {
        color: 'sky'
      }
    }
  ]
};

export default CodeNode;
