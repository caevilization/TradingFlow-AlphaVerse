export interface Param {
  id: string;
  name: string;
  value: string;
}

export type NodeType = 'core' | 'operation' | 'bot' | 'market' | 'news' | 'media' | 'default';

export type InputType = 'none' | 'text' | 'number' | 'select' | 'multiselect' | 'object' | 'paragraph' | 'address' | 'searchSelect' | 'paramMatrix';

export interface TFDiff<T = any> {
  oldValue: T;
  newValue: T;
  accepted?: boolean;
  preview?: boolean;
}

export interface TFInput {
  id: string;
  title: string;
  titleDiff?: TFDiff<string>;
  tooltip?: string;
  tooltipDiff?: TFDiff<string>;
  type: InputType;
  typeDiff?: TFDiff<InputType>;
  inputType: InputType;
  inputTypeDiff?: TFDiff<InputType>;
  required?: boolean;
  chainRef?: string;  // 关联的链选择输入的 ID
  requiredDiff?: TFDiff<boolean>;
  placeholder?: string;
  placeholderDiff?: TFDiff<string>;
  value?: string | number | string[] | Param[];
  isConnected?: boolean;  // 是否有边连接到此输入
  connectedHandles?: string[];  // 已连接的 handle id 列表
  valueDiff?: TFDiff<string | number | string[] | Param[]>;
  isDeleted?: boolean;
  options?: Array<string | { value: string; label: string }>;
  optionsDiff?: TFDiff<Array<string | { value: string; label: string }>>;
  handle?: {
    color?: string;
  };
  handleDiff?: TFDiff<{
    color?: string;
  }>;
}

export interface TFOutput {
  id: string;
  title: string;
  titleDiff?: TFDiff<string>;
  type: InputType;
  typeDiff?: TFDiff<InputType>;
  isDeleted?: boolean;
  handle?: {
    color?: string;
  };
  handleDiff?: TFDiff<{
    color?: string;
  }>;
}

export interface TFMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'default' | 'danger' | 'ai';
  hidden?: boolean;
}

export interface TFEdge {
  id: string;
  source: string;
  sourceHandle?: string;
  target: string;
  targetHandle?: string;
}

export interface TFNodeData {
  // 元信息
  id: string;
  nodeType: NodeType;
  isLocked: boolean;
  nodeTypeDiff?: TFDiff<NodeType>;

  // 基础描述信息
  title: string;
  titleDiff?: TFDiff<string>;
  description: string;
  descriptionDiff?: TFDiff<string>;
  icon?: React.ReactNode;

  // 高级描述信息
  inputs: TFInput[];
  outputs: TFOutput[];
  menuItems?: TFMenuItem[];

  // 事件处理
  onRunOnce: () => void;
  onDataChange: (id: string, newData: Partial<TFNodeData>) => void;
  handleDeleteNode: (id: string) => void;
}
