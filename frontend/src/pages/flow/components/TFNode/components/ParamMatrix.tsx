import React from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { Position, useStore } from 'reactflow';
import { cn } from '../../../../../utils/utils';
import { TFInput } from '../types';
import Handle from './Handle';

interface Param {
  id: string;
  name: string;
  value: string;
  isConnected?: boolean;
}

interface ParamMatrixProps {
  input: TFInput;
  value?: Param[];
  onChange: (value: Param[]) => void;
  isLocked?: boolean;
  className?: string;
}

export const ParamMatrix: React.FC<ParamMatrixProps> = ({
  value = [],
  onChange,
  isLocked,
  className,
  input,
}) => {
  // 获取边缘状态
  const edges = useStore((state) => state.edges);

  // 检查参数的连接状态
  const getParamConnectionStatus = (paramName: string) => {
    const paramId = `${input.id}-${paramName}`;
    return edges.some(edge => edge.target === paramId);
  };

  // 添加新参数
  const addParam = () => {
    const newParam = {
      id: `param_${Date.now()}`,
      name: `Parameter ${value.length + 1}`,
      value: '',
      isConnected: false
    };
    onChange([...value, newParam]);
  };

  // 移除参数
  const removeParam = (id: string) => {
    onChange(value.filter(p => p.id !== id));
  };

  // 更新参数
  const updateParam = (id: string, field: 'name' | 'value', newValue: string) => {
    onChange(value.map(p => {
      if (p.id !== id) return p;

      // 如果参数已连接且试图更新值，不做任何更改
      if (getParamConnectionStatus(p.name) && field === 'value') {
        return { ...p, isConnected: true };
      }

      // 更新参数
      const updatedParam = { ...p, [field]: newValue };
      
      // 如果是更新名称，检查新名称的连接状态
      if (field === 'name') {
        updatedParam.isConnected = getParamConnectionStatus(newValue);
      } else {
        updatedParam.isConnected = getParamConnectionStatus(p.name);
      }

      return updatedParam;
    }));
  };

  // 处理参数的连接状态
  const paramsWithConnectionStatus = value.map(param => ({
    ...param,
    isConnected: getParamConnectionStatus(param.name)
  }));

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {paramsWithConnectionStatus.map((param) => (
        <div
          key={param.id}
          className="flex items-center gap-2 bg-tf-background-secondary rounded-md p-2 relative"
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${input.id}-${param.name}`}
            inputType={input.type}
            style={{
              left: '-12px',
              background: input.handle?.color ? `var(--tf-accent-${input.handle.color})` : undefined,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '12px',
              height: '12px'
            }}
          />
          <input
            type="text"
            value={param.name}
            onChange={(e) => updateParam(param.id, 'name', e.target.value)}
            className="flex-1 px-2 py-1 text-sm bg-tf-background rounded border border-tf-border focus:border-tf-accent-primary-light dark:focus:border-tf-accent-primary outline-none disabled:bg-tf-base-bg2-lmode/10 dark:disabled:bg-tf-base-bg2/10"
            placeholder="Parameter name"
            disabled={isLocked || param.isConnected}
          />
          <input
            type="text"
            value={param.isConnected ? 'RECEIVING_INPUTS' : param.value}
            onChange={(e) => updateParam(param.id, 'value', e.target.value)}
            className="flex-1 px-2 py-1 text-sm bg-tf-background rounded border border-tf-border focus:border-tf-accent-primary-light dark:focus:border-tf-accent-primary outline-none disabled:bg-tf-base-bg2-lmode/10 dark:disabled:bg-tf-base-bg2/10 disabled:text-tf-base-subtext-lmode dark:disabled:text-tf-base-subtext"
            placeholder="Parameter value"
            disabled={isLocked || param.isConnected}
          />
          {!isLocked && (
            <button
              type="button"
              onClick={() => removeParam(param.id)}
              className="p-1 hover:text-tf-accent-primary-light dark:hover:text-tf-accent-primary"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      {!isLocked && (
        <button
          type="button"
          onClick={addParam}
          className="flex items-center justify-center gap-1 text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-primary-light dark:hover:text-tf-accent-primary"
        >
          <PlusIcon className="w-4 h-4" />
          Add Parameter
        </button>
      )}
    </div>
  );
};
