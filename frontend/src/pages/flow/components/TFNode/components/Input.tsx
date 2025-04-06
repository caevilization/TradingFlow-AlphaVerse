import React, { useState } from 'react';
import { Param } from '../types';
import { ParamMatrix } from './ParamMatrix';
import { SearchSelect } from '../inputs';
import Handle from './Handle';
import { X, XCircle, HelpCircle, Check, ShieldPlus } from 'lucide-react';
import { Position } from 'reactflow';
import { TFInput } from '../types';
import { nodeApi } from '../../../../../api/node';

interface InputProps {
  input: TFInput;
  onDelete: (id: string) => void;
  onChange: (id: string, value: string | number | string[] | Param[]) => void;
  isLocked?: boolean;
  onAcceptDiff?: (id: string) => void;
  onRejectDiff?: (id: string) => void;
}

const Input: React.FC<InputProps> = ({
  input,
  onDelete,
  onChange,
  isLocked,
  onAcceptDiff,
  onRejectDiff,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // 获取 diff 样式
  const getDiffStyles = (diff?: any, isOld?: boolean) => {
    if (!diff?.preview) return '';
    return isOld
      ? 'bg-tf-accent-rose/10 dark:bg-tf-accent-rose/10 text-tf-base-text-lmode dark:text-tf-base-text line-through'
      : 'bg-tf-accent-emerald/10 dark:bg-tf-accent-emerald/10 text-tf-base-text-lmode dark:text-tf-base-text';
  };

  // 获取输入框的值
  const getInputValue = () => {
    // 如果是 paramMatrix 类型，不返回 'RECEIVING INPUTS'
    if (input.isConnected && input.type !== 'paramMatrix') {
      return 'RECEIVING INPUTS';
    }
    return input.valueDiff?.preview ? input.valueDiff.newValue : input.value;
  };

  // 渲染输入框
  const renderInput = () => {
    // 基本样式
    const baseInputClass = `
      w-full bg-white dark:bg-tf-base-bg1 text-tf-base-text-lmode dark:text-tf-base-text border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded px-2 py-1
      focus:border-tf-accent-primary-light dark:focus:border-tf-accent-primary focus:ring-1 focus:ring-tf-accent-primary-light dark:focus:ring-tf-accent-primary
      focus:outline-none transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-tf-base-bg2-lmode/10 dark:disabled:bg-tf-base-bg2/10
      placeholder:text-tf-base-subtext-lmode dark:placeholder:text-tf-base-subtext
      hover:border-tf-base-bg2-lmode/80 dark:hover:border-tf-base-bg2/80
      ${getDiffStyles(input.valueDiff)}
    `;

    // 根据类型渲染不同的输入框
    switch (input.type) {
      case 'text':
        return (
          <input
            type="text"
            className={baseInputClass}
            placeholder={
              input.placeholderDiff?.preview ? input.placeholderDiff.newValue : input.placeholder
            }
            value={(getInputValue() as string) || ''}
            onChange={e => onChange(input.id, e.target.value)}
            disabled={isLocked || input.isConnected}
          />
        );
      case 'number':
        const handleStep = (direction: 'up' | 'down', e?: React.MouseEvent) => {
          const currentValue = parseFloat((getInputValue() as string) || '0');
          const step = e?.shiftKey ? 10 : 1;
          const newValue = direction === 'up' ? currentValue + step : currentValue - step;
          onChange(input.id, newValue);
        };

        return (
          <div className="relative">
            <input
              type="number"
              className={`${baseInputClass} pr-8 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]`}
              placeholder={
                input.placeholderDiff?.preview ? input.placeholderDiff.newValue : input.placeholder
              }
              value={(getInputValue() as number) || 0}
              onChange={e => {
                const value = e.target.value;
                if (value === '' || value === '-') {
                  onChange(input.id, value);
                  return;
                }
                const num = parseFloat(value);
                if (!isNaN(num)) {
                  onChange(input.id, num);
                }
              }}
              onKeyDown={e => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  handleStep(
                    e.key === 'ArrowUp' ? 'up' : 'down',
                    e.nativeEvent as unknown as React.MouseEvent
                  );
                }
              }}
              step="any"
              disabled={isLocked || input.isConnected}
            />
            <div className="absolute right-1 top-1 bottom-1 flex flex-col justify-center">
              <button
                type="button"
                className="h-4 px-1 flex items-center justify-center text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-primary-light dark:hover:text-tf-accent-primary"
                onClick={e => handleStep('up', e)}
                disabled={isLocked || input.isConnected}
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 15L12 9L6 15" />
                </svg>
              </button>
              <button
                type="button"
                className="h-4 px-1 flex items-center justify-center text-tf-base-subtext-lmode dark:text-tf-base-subtext hover:text-tf-accent-primary-light dark:hover:text-tf-accent-primary"
                onClick={e => handleStep('down', e)}
                disabled={isLocked || input.isConnected}
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9L12 15L18 9" />
                </svg>
              </button>
            </div>
          </div>
        );
      case 'select':
        return (
          <select
            className={`${baseInputClass} [&>option]:text-tf-base-text-lmode dark:[&>option]:text-tf-base-text [&>option]:bg-white dark:[&>option]:bg-tf-base-bg1`}
            value={(getInputValue() as string) || ''}
            onChange={e => onChange(input.id, e.target.value)}
            disabled={isLocked || input.isConnected}
          >
            {input.options?.map(option => {
              const value = typeof option === 'string' ? option : option.value;
              const label = typeof option === 'string' ? option : option.label;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        );
      case 'multiselect':
        return (
          <select
            className={`${baseInputClass} [&>option]:text-tf-base-text-lmode dark:[&>option]:text-tf-base-text [&>option]:bg-white dark:[&>option]:bg-tf-base-bg1 [&>option:checked]:bg-tf-accent-primary-light/10 dark:[&>option:checked]:bg-tf-accent-primary/10`}
            value={(getInputValue() as string[]) || []}
            multiple
            disabled={isLocked || input.isConnected}
            onChange={e => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              onChange(input.id, selectedOptions);
            }}
          >
            {input.options?.map(option => {
              const value = typeof option === 'string' ? option : option.value;
              const label = typeof option === 'string' ? option : option.label;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        );
      case 'paragraph':
        return (
          <textarea
            className={`${baseInputClass} min-h-[100px] resize-y`}
            placeholder={
              input.placeholderDiff?.preview ? input.placeholderDiff.newValue : input.placeholder
            }
            value={(getInputValue() as string) || ''}
            onChange={e => onChange(input.id, e.target.value)}
            disabled={isLocked || input.isConnected}
          />
        );
      case 'searchSelect':
        return (
          <SearchSelect
            value={(getInputValue() as string) || ''}
            onChange={value => onChange(input.id, value)}
            options={
              input.options?.map(option => {
                const value = typeof option === 'string' ? option : option.value;
                const label = typeof option === 'string' ? option : option.label;
                return { value, label };
              }) || []
            }
            placeholder={
              input.placeholderDiff?.preview ? input.placeholderDiff.newValue : input.placeholder
            }
            disabled={isLocked || input.isConnected}
            className={baseInputClass}
          />
        );

      case 'paramMatrix':
        // 对于 paramMatrix 类型，先检查是否整个输入已连接
        if (input.isConnected) {
          return (
            <ParamMatrix
              value={[]}
              onChange={value => onChange(input.id, value)}
              isLocked={true}
              className="mt-1"
              input={input}
            />
          );
        }

        // 如果未连接，使用原始值
        const value = input.valueDiff?.preview ? input.valueDiff.newValue : input.value;
        const params = Array.isArray(value) ? value : [];

        // 确保参数数组中的每个元素都是 Param 类型
        const validParams = params.filter(
          (p): p is Param => p && typeof p === 'object' && 'id' in p && 'name' in p && 'value' in p
        );

        return (
          <ParamMatrix
            value={validParams.map(param => ({
              ...param,
              // 检查单个参数的连接状态
              isConnected: Boolean(input.connectedHandles?.includes(`${input.id}-${param.name}`)),
            }))}
            onChange={value => onChange(input.id, value)}
            isLocked={isLocked}
            className="mt-1"
            input={input}
          />
        );

      case 'address':
        const handleGenerateAddress = async () => {
          try {
            setIsGenerating(true);
            // 获取关联的 chain 输入
            const chainInput = input.chainRef
              ? (document.querySelector(`[data-input-id="${input.chainRef}"]`) as HTMLSelectElement)
              : null;
            const chain = (chainInput?.value || 'eth').toLowerCase() as 'btc' | 'eth' | 'solana';

            const address = await nodeApi.generateAddress(chain);
            onChange(input.id, address);
          } catch (error) {
            console.error('Failed to generate address:', error);
            // TODO: 添加错误提示
          } finally {
            setIsGenerating(false);
          }
        };

        return (
          <div className="flex flex-col gap-2" data-input-id={input.id}>
            <input
              type="text"
              className={baseInputClass}
              placeholder={
                input.placeholderDiff?.preview ? input.placeholderDiff.newValue : input.placeholder
              }
              value={(getInputValue() as string) || ''}
              onChange={e => onChange(input.id, e.target.value)}
              disabled={isLocked || input.isConnected}
            />
            <button
              onClick={handleGenerateAddress}
              disabled={isLocked || isGenerating}
              className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-tf-base-bg1 hover:bg-tf-base-bg2-lmode/20 dark:hover:bg-tf-base-bg2/20 rounded text-tf-accent-primary-light dark:text-tf-accent-primary hover:text-tf-accent-primary dark:hover:text-tf-accent-primary-light text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-tf-base-bg2-lmode/10 dark:disabled:bg-tf-base-bg2/10 disabled:text-tf-base-subtext-lmode dark:disabled:text-tf-base-subtext border border-tf-base-bg2-lmode dark:border-tf-base-bg2 hover:border-tf-base-bg2-lmode/80 dark:hover:border-tf-base-bg2/80"
            >
              <ShieldPlus className="w-4 h-4 text-tf-accent-primary-light dark:text-tf-accent-primary group-disabled:text-tf-base-subtext-lmode dark:group-disabled:text-tf-base-subtext" />
              <span className="text-tf-accent-primary-light dark:text-tf-accent-primary group-disabled:text-tf-base-subtext-lmode dark:group-disabled:text-tf-base-subtext">
                {isGenerating ? 'Generating...' : 'Generate Address'}
              </span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-2 relative flex flex-col gap-2">
      <div className="flex-1 p-2 rounded bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode/50 dark:border-tf-base-bg2/50 hover:border-tf-base-bg2-lmode/80 dark:hover:border-tf-base-bg2/80 transition-colors duration-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* 标题和提示 */}
            <div className="flex items-center gap-1">
              {input.tooltip && (
                <div className="relative">
                  <HelpCircle
                    className="w-4 h-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext cursor-help hover:text-tf-accent-primary-light dark:hover:text-tf-accent-primary transition-colors duration-200"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  />
                  {showTooltip && (
                    <div className="absolute bottom-full left-0 mb-1 p-2 bg-white dark:bg-tf-base-bg1 text-tf-base-text-lmode dark:text-tf-base-text text-sm rounded shadow-lg whitespace-nowrap border border-tf-base-bg2-lmode dark:border-tf-base-bg2">
                      {input.tooltipDiff?.preview ? input.tooltipDiff.newValue : input.tooltip}
                    </div>
                  )}
                </div>
              )}
              <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext text-sm">
                {input.title}
              </span>
              {input.required && (
                <span className="text-tf-accent-rose dark:text-tf-accent-rose text-sm">*</span>
              )}
            </div>
          </div>

          {/* 删除按钮 */}
          {!input.required && (
            <XCircle
              className="w-4 h-4 text-tf-base-subtext-lmode dark:text-tf-base-subtext cursor-pointer hover:text-tf-accent-rose transition-colors duration-200"
              onClick={() => onDelete(input.id)}
            />
          )}
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-2 items-center">
          <div className="w-4">
            {input.type !== 'none' && input.type !== 'paramMatrix' && (
              <Handle
                type="target"
                position={Position.Left}
                inputType={input.type}
                id={`${input.id}-handle`}
              />
            )}
          </div>
          <div className="w-full">
            {input.valueDiff?.preview ? (
              <div className="flex flex-col gap-2">
                {/* Old Value */}
                <div className={getDiffStyles(input.valueDiff, true)}>
                  <div className="p-2 rounded">{input.valueDiff.oldValue}</div>
                </div>
                {/* New Value */}
                <div className={getDiffStyles(input.valueDiff, false)}>
                  <div className="p-2 rounded">{input.valueDiff.newValue}</div>
                </div>
              </div>
            ) : (
              <div>{renderInput()}</div>
            )}
          </div>
        </div>
      </div>

      {/* Diff Actions */}
      {(input.valueDiff?.preview ||
        input.titleDiff?.preview ||
        input.tooltipDiff?.preview ||
        input.placeholderDiff?.preview) && (
        <div className="absolute right-0 top-0 flex gap-1">
          <button
            onClick={() => onAcceptDiff?.(input.id)}
            className="p-1 rounded bg-tf-accent-emerald/20 dark:bg-tf-accent-emerald/20 hover:bg-tf-accent-emerald/30 dark:hover:bg-tf-accent-emerald/30 transition-colors"
            disabled={isLocked || input.isConnected}
          >
            <Check className="w-3.5 h-3.5 text-tf-accent-emerald dark:text-tf-accent-emerald" />
          </button>
          <button
            onClick={() => onRejectDiff?.(input.id)}
            className="p-1 rounded bg-tf-accent-rose/20 dark:bg-tf-accent-rose/20 hover:bg-tf-accent-rose/30 dark:hover:bg-tf-accent-rose/30 transition-colors"
            disabled={isLocked || input.isConnected}
          >
            <X className="w-3.5 h-3.5 text-tf-accent-rose dark:text-tf-accent-rose" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
