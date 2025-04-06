import React from 'react';
import { NodeProps } from 'reactflow';
import { TFNodeData } from '../../types';
import TFNode from '../../index';
import { createDatasetNodeConfig } from '../shared/datasetConfig.tsx';

interface DatasetNodeProps extends NodeProps<TFNodeData> {}

const DatasetNode: React.FC<DatasetNodeProps> = (props) => {
  return <TFNode {...props} />;
};

export const datasetNodeConfig = createDatasetNodeConfig(false);

export default DatasetNode;
