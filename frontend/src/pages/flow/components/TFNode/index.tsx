// 导入必要的 React 组件和钩子
import React, { useState, useRef, useEffect } from 'react';
// 导入 ReactFlow 的节点属性类型
import { NodeProps } from 'reactflow';
// 导入图标组件
import { ChevronDown, ChevronUp, Wand2, Trash2 } from 'lucide-react';
// 导入自定义组件
import Input from './components/Input';
import Output from './components/Output';
import { TFNodeData } from './types';
import { AIPromptInput } from './components/AiPromptInput';
import { MenuBar } from './components/MenuBar';
import { DiffActions } from './components/DiffActions';
import { NodeHeader } from './components/NodeHeader';

/**
 * TFNode 组件 - 交易流程图中的节点组件
 * @param props - ReactFlow 节点属性
 */
const TFNode: React.FC<NodeProps<TFNodeData>> = props => {
  // 获取所有需要的数据
  const {
    id,
    nodeType,
    nodeTypeDiff,
    isLocked,
    title,
    titleDiff,
    description,
    descriptionDiff,
    icon,
    inputs,
    outputs,
    menuItems,
    onRunOnce,
    onDataChange,
    handleDeleteNode,
  } = props.data;
  const { selected } = props;

  // 所有的 hooks 必须在组件顶层调用
  const [showAIInput, setShowAIInput] = useState(false); // 控制 AI 输入框显示
  const [aiPrompt, setAiPrompt] = useState(''); // AI 提示文本
  const [showDeleted, setShowDeleted] = useState(false); // 控制已删除项的显示
  const [hasDiff, setHasDiff] = useState(false); // 节点是否有变化

  const inputRef = useRef<HTMLInputElement>(null); // 输入框引用

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        showAIInput &&
        inputRef.current &&
        !inputRef.current.contains(target) &&
        !target.closest('.ai-input-container')
      ) {
        setShowAIInput(false);
        setAiPrompt('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAIInput]);

  // 处理节点锁定状态
  useEffect(() => {
    if (isLocked) {
      const handleGlobalMouseEvents = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

      document.addEventListener('mousedown', handleGlobalMouseEvents, true);
      document.addEventListener('mousemove', handleGlobalMouseEvents, true);
      document.addEventListener('mouseup', handleGlobalMouseEvents, true);
      document.addEventListener('click', handleGlobalMouseEvents, true);

      return () => {
        document.removeEventListener('mousedown', handleGlobalMouseEvents, true);
        document.removeEventListener('mousemove', handleGlobalMouseEvents, true);
        document.removeEventListener('mouseup', handleGlobalMouseEvents, true);
        document.removeEventListener('click', handleGlobalMouseEvents, true);
      };
    }
  }, [isLocked]);

  // 检查是否有变化
  useEffect(() => {
    const titleDifferent = titleDiff?.preview;
    const descriptionDifferent = descriptionDiff?.preview;
    const inputsDifferent = inputs?.some(
      input =>
        input.valueDiff?.preview ||
        input.titleDiff?.preview ||
        input.tooltipDiff?.preview ||
        input.placeholderDiff?.preview
    );

    const hasDifference = titleDifferent || descriptionDifferent || inputsDifferent;
    setHasDiff(hasDifference);
  }, [titleDiff, descriptionDiff, inputs]);

  // 检查是否有已删除的输入输出项
  const hasDeletedItems = inputs.some(i => i.isDeleted) || outputs.some(o => o.isDeleted);

  // 创建默认菜单项
  const createDefaultMenuItems = () => [];

  /**
   * 处理输入项的删除
   * @param inputId - 要删除的输入项 ID
   */
  const handleInputDelete = (inputId: string) => {
    onDataChange(id, {
      ...props.data,
      inputs: inputs.map(i => (i.id === inputId ? { ...i, isDeleted: true } : i)),
    });
  };

  /**
   * 处理输出项的删除
   * @param outputId - 要删除的输出项 ID
   */
  const handleOutputDelete = (outputId: string) => {
    onDataChange(id, {
      ...props.data,
      outputs: outputs.map(o => (o.id === outputId ? { ...o, isDeleted: true } : o)),
    });
  };

  /**
   * 处理输入项的值变化
   * @param inputId - 要更新的输入项 ID
   * @param value - 新的输入值
   */
  const handleInputChange = (inputId: string, value: string | number | string[]) => {
    onDataChange(id, {
      ...props.data,
      inputs: inputs.map(i => {
        if (i.id === inputId) {
          // 如果是 select 类型的输入，确保值是一个对象
          if (i.type === 'select' && typeof value === 'string') {
            const option = i.options?.find(opt => 
              typeof opt === 'string' ? opt === value : opt.value === value
            );
            if (option) {
              return {
                ...i,
                value: typeof option === 'string' ? option : option.value
              };
            }
          }
          return { ...i, value };
        }
        return i;
      }),
    });
  };

  /**
   * 恢复已删除的输入项
   * @param inputId - 要恢复的输入项 ID
   */
  const handleInputRestore = (inputId: string) => {
    onDataChange(id, {
      ...props.data,
      inputs: inputs.map(i => (i.id === inputId ? { ...i, isDeleted: false } : i)),
    });
  };

  /**
   * 恢复已删除的输出项
   * @param outputId - 要恢复的输出项 ID
   */
  const handleOutputRestore = (outputId: string) => {
    onDataChange(id, {
      ...props.data,
      outputs: outputs.map(o => (o.id === outputId ? { ...o, isDeleted: false } : o)),
    });
  };

  // 处理是否修改锁定
  const handleLockChange = (newLockState: boolean) => {
    onDataChange(id, {
      ...props.data,
      isLocked: newLockState,
    });
  };

  /**
   * 处理 AI 提示的提交
   * 当用户提交 AI 提示时，模拟 AI 生成过程并更新节点内容
   */
  const handleAIPromptSubmit = () => {
    if (aiPrompt.trim()) {
      // 设置初始状态
      handleLockChange(true); // 锁定节点

      // TODO: 模拟 AI 生成过程，1秒后完成，需要删除
      setTimeout(() => {
        // 更新状态
        handleLockChange(false); // 解锁节点

        // 更新节点数据，添加差异信息
        const newData = {
          ...props.data,
          // 更新节点描述
          descriptionDiff: {
            oldValue: description,
            newValue: 'This node transfers SOL tokens to a specified address',
            preview: true,
          },
          // 更新节点标题
          titleDiff: {
            oldValue: title,
            newValue: 'Transfer SOL Tokens',
            preview: true,
          },
          // 更新输入项
          inputs: inputs.map(input => {
            // 更新区块链输入项
            if (input.id === 'chain') {
              return {
                ...input,
                valueDiff: {
                  oldValue: input.value || '',
                  newValue: 'SOL',
                  preview: true,
                },
                titleDiff: {
                  oldValue: input.title,
                  newValue: 'Blockchain Network',
                  preview: true,
                },
              };
            }
            // 更新地址输入项
            else if (input.id === 'address') {
              return {
                ...input,
                valueDiff: {
                  oldValue: input.value || '',
                  newValue: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                  preview: true,
                },
                tooltipDiff: {
                  oldValue: input.tooltip || '',
                  newValue: 'The recipient address on the SOL network',
                  preview: true,
                },
              };
            }
            // 更新金额输入项
            else if (input.id === 'amount') {
              return {
                ...input,
                valueDiff: {
                  oldValue: input.value || '',
                  newValue: '1000',
                  preview: true,
                },
                placeholderDiff: {
                  oldValue: input.placeholder || '',
                  newValue: 'Enter amount in SOL',
                  preview: true,
                },
              };
            }
            return input;
          }),
        };
        console.log('newData', newData);

        onDataChange(id, newData);
      }, 1000);
    }
  };

  /**
   * 接受差异更改
   * @param inputId - 要接受更改的输入项 ID
   */
  const handleAcceptDiff = (inputId: string) => {
    // 更新输入项的差异
    onDataChange(id, {
      ...props,
      inputs: inputs.map(input => {
        if (input.id === inputId) {
          const newInput = { ...input };
          // 处理值的差异
          if (input.valueDiff?.preview) {
            newInput.value = input.valueDiff.newValue;
            newInput.valueDiff = undefined;
          }
          // 处理标题的差异
          if (input.titleDiff?.preview) {
            newInput.title = input.titleDiff.newValue;
            newInput.titleDiff = undefined;
          }
          // 处理提示的差异
          if (input.tooltipDiff?.preview) {
            newInput.tooltip = input.tooltipDiff.newValue;
            newInput.tooltipDiff = undefined;
          }
          // 处理占位符的差异
          if (input.placeholderDiff?.preview) {
            newInput.placeholder = input.placeholderDiff.newValue;
            newInput.placeholderDiff = undefined;
          }
          return newInput;
        }
        return input;
      }),
    });
  };

  /**
   * 拒绝差异更改
   * @param inputId - 要拒绝更改的输入项 ID
   */
  const handleRejectDiff = (inputId: string) => {
    onDataChange(id, {
      ...props.data,
      inputs: inputs.map(input => {
        if (input.id === inputId) {
          return {
            ...input,
            valueDiff: undefined,
            titleDiff: undefined,
            tooltipDiff: undefined,
            placeholderDiff: undefined,
          };
        }
        return input;
      }),
    });
  };

  /**
   * 接受所有 AI 生成的差异更改
   * 包括节点的标题、描述以及所有输入项的变化
   */
  const handleAcceptAll = () => {
    // 处理所有输入项的差异
    const updatedInputs = inputs.map(input => {
      const newInput = { ...input };

      // 处理值的差异
      if (input.valueDiff?.preview) {
        newInput.value = input.valueDiff.newValue; // 更新为新值
        newInput.valueDiff = undefined; // 清除差异标记
      }

      // 处理标题的差异
      if (input.titleDiff?.preview) {
        newInput.title = input.titleDiff.newValue; // 更新为新标题
        newInput.titleDiff = undefined; // 清除差异标记
      }

      // 处理提示的差异
      if (input.tooltipDiff?.preview) {
        newInput.tooltip = input.tooltipDiff.newValue; // 更新为新提示
        newInput.tooltipDiff = undefined; // 清除差异标记
      }

      // 处理占位符的差异
      if (input.placeholderDiff?.preview) {
        newInput.placeholder = input.placeholderDiff.newValue; // 更新为新占位符
        newInput.placeholderDiff = undefined; // 清除差异标记
      }

      return newInput;
    });
    onDataChange(id, {
      ...props.data,
      inputs: updatedInputs,
      // 如果有差异预览，使用新值，否则保持原值
      title: titleDiff?.preview ? titleDiff.newValue : title,
      description: descriptionDiff?.preview ? descriptionDiff.newValue : description,
      // 清除差异标记
      titleDiff: undefined,
      descriptionDiff: undefined,
    });
  };

  /**
   * 拒绝所有 AI 生成的差异更改
   * 将所有内容恢复到原始状态
   */
  const handleRejectAll = () => {
    // 清除所有输入项的差异标记
    const updatedInputs = inputs.map(input => ({
      ...input,
      valueDiff: undefined, // 清除值的差异
      titleDiff: undefined, // 清除标题的差异
      tooltipDiff: undefined, // 清除提示的差异
      placeholderDiff: undefined, // 清除占位符的差异
    }));
    onDataChange(id, {
      ...props.data,
      inputs: updatedInputs,
      titleDiff: undefined, // 清除标题差异
      descriptionDiff: undefined, // 清除描述差异
    });
  };

  /**
   * 渲染节点组件
   */
  return (
    // 根容器：处理节点的锁定状态
    <div
      className={`relative ${isLocked ? 'pointer-events-none' : ''}`}
      style={{
        userSelect: isLocked ? 'none' : 'auto', // 锁定时禁止文本选择
        pointerEvents: isLocked ? 'none' : 'auto', // 锁定时禁止鼠标交互
      }}
    >
      {/* 锁定状态遮罩层 */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tf-accent-primary"></div>
        </div>
      )}

      {/* 悬浮控制区 - 包含菜单栏和 AI 输入框 */}
      <div className="absolute bottom-full left-0 right-0 flex flex-col items-center gap-2 mb-2">
        {/* 菜单栏 - 仅在节点被选中时显示 */}
        {selected && (
          <div className="w-full flex justify-center">
            <MenuBar
              isLocked={isLocked} // 锁定状态
              onAIGenerate={() => setShowAIInput(true)} // 显示 AI 输入框
              onDelete={() => handleDeleteNode?.(id || '')} // 删除节点
              extraMenuItems={createDefaultMenuItems().map(item => ({
                // 额外的菜单项
                ...item,
                onClick: item.onClick || (() => {}), // 为可选的 onClick 提供默认空函数
              }))}
            />
          </div>
        )}

        {/* AI 输入框 - 仅在 showAIInput 为 true 时显示 */}
        {showAIInput && (
          <div className="w-full flex justify-center">
            <AIPromptInput
              aiPrompt={aiPrompt} // AI 提示文本
              isLocked={isLocked} // 锁定状态
              onClose={() => {
                // 关闭回调：重置所有状态
                setShowAIInput(false);
                setAiPrompt('');
              }}
              onChange={setAiPrompt} // 提示文本变化回调
              onSubmit={handleAIPromptSubmit} // 提交提示回调
            />
          </div>
        )}
      </div>

      {/* 节点容器 */}
      <div className="flex gap-3">
        {/* 主节点 */}
        <div
          className={`
            bg-white dark:bg-tf-base-bg1 min-w-[250px] relative
            transition-all duration-200
            ${
              selected // 根据 ReactFlow 的选中状态应用不同的样式
                ? 'outline outline-1 outline-tf-base-bg1 dark:outline-tf-base-white rounded-lg'
                : 'border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-lg'
            }
          `}
        >
          {/* 节点头部 */}
          <div
            className="
              p-3 border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2
              bg-white dark:bg-tf-base-bg1
            "
          >
            <NodeHeader
              icon={icon} // 节点图标
              title={title} // 节点标题
              titleDiff={titleDiff} // 标题差异
              description={description} // 节点描述
              descriptionDiff={descriptionDiff} // 描述差异
              nodeType={nodeType} // 节点子类型
              onRunOnce={onRunOnce} // 运行一次回调
              onAcceptDiff={() => {
                onDataChange(id, {
                  ...props.data,
                  description: descriptionDiff?.preview ? descriptionDiff.newValue : description,
                  descriptionDiff: undefined,
                });
              }}
              onRejectDiff={() => {
                onDataChange(id, {
                  ...props.data,
                  descriptionDiff: undefined,
                });
              }}
            />
          </div>

          {/* 节点内容区域 */}
          <div className="p-3">
            {/* 输入项列表 - 仅显示未删除的输入项 */}
            {inputs
              .filter(input => !input.isDeleted) // 过滤掉已删除的输入项
              .map(input => (
                <Input
                  key={input.id}
                  input={input} // 输入项数据
                  onDelete={handleInputDelete} // 删除回调
                  onChange={handleInputChange} // 变更回调
                  isLocked={isLocked} // 锁定状态
                  onAcceptDiff={handleAcceptDiff} // 接受差异回调
                  onRejectDiff={handleRejectDiff} // 拒绝差异回调
                />
              ))}

            {/* 输出项列表 - 仅显示未删除的输出项 */}
            {outputs
              .filter(output => !output.isDeleted) // 过滤掉已删除的输出项
              .map(output => (
                <Output
                  key={output.id}
                  output={output} // 输出项数据
                  onDelete={handleOutputDelete} // 删除回调
                />
              ))}
          </div>

          {/* 全局差异操作按钮 */}
          <div className="mt-4 pb-2 flex justify-center relative">
            {hasDiff && !isLocked && (
              <DiffActions
                isLocked={isLocked} // 锁定状态
                onAcceptAll={handleAcceptAll} // 接受所有差异回调
                onRejectAll={handleRejectAll} // 拒绝所有差异回调
              />
            )}
          </div>

          {/* 已删除项目区域 - 仅在有已删除项目时显示 */}
          {hasDeletedItems && (
            <div className="relative">
              {/* 分隔线和展开/收起按钮 */}
              <div className="border-t border-tf-base-bg2-lmode dark:border-[#232326] mt-2">
                <div className="flex items-center justify-center py-2">
                  <button
                    onClick={() => setShowDeleted(!showDeleted)} // 切换显示/隐藏已删除项目
                    className={`
                      w-7 h-7 rounded-lg bg-tf-base-bg2-lmode dark:bg-tf-base-bg2 flex items-center justify-center
                      hover:bg-tf-accent-primary transition-colors duration-200
                      ${
                        showDeleted ? 'bg-tf-accent-primary' : ''
                      }  // 当显示已删除项目时改变按钮颜色
                    `}
                  >
                    {/* 根据显示状态切换箭头图标方向 */}
                    {showDeleted ? (
                      <ChevronUp className="w-4 h-4 text-tf-base-bg1 dark:text-tf-base-white" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-tf-base-bg1 dark:text-tf-base-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* 已删除项目列表 - 仅在展开时显示 */}
              {showDeleted && (
                <div
                  className="
                    absolute bg-tf-base-bg1-lmode dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-lg p-3 shadow-lg
                    w-[calc(100%-16px)] left-[8px] bottom-[calc(100%+8px)]  // 定位在节点下方
                    backdrop-blur-sm bg-opacity-95 z-[100]                    // 半透明背景和层级
                  "
                >
                  {/* 无已删除项目时显示提示信息 */}
                  {inputs.filter(p => p.isDeleted).length === 0 &&
                    outputs.filter(o => o.isDeleted).length === 0 && (
                      <div className="text-tf-base-subtext-lmode dark:text-tf-base-subtext text-sm text-center py-2">
                        No deleted items
                      </div>
                    )}

                  {/* 已删除的输入项列表 */}
                  {inputs
                    .filter(p => p.isDeleted)
                    .map(input => (
                      <div
                        key={input.id}
                        className="flex items-center justify-between p-2 hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 rounded-md group transition-colors cursor-pointer"
                        onClick={() => {
                          handleInputRestore(input.id); // 恢复输入项
                          // 如果这是最后一个已删除项，则自动收起列表
                          if (
                            inputs.filter(p => p.isDeleted).length === 1 &&
                            outputs.filter(o => o.isDeleted).length === 0
                          ) {
                            setShowDeleted(false);
                          }
                        }}
                      >
                        <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext group-hover:text-tf-base-bg1 dark:group-hover:text-tf-base-white transition-colors">
                          {input.title}
                        </span>
                        <span className="text-tf-accent-primary text-sm group-hover:text-tf-accent-primary-light">
                          Restore
                        </span>
                      </div>
                    ))}

                  {/* 已删除的输出项列表 */}
                  {outputs
                    .filter(o => o.isDeleted)
                    .map(output => (
                      <div
                        key={output.id}
                        className="flex items-center justify-between p-2 hover:bg-tf-base-bg2-lmode/50 dark:hover:bg-tf-base-bg2/50 rounded-md group transition-colors cursor-pointer"
                        onClick={() => {
                          handleOutputRestore(output.id); // 恢复输出项
                          // 如果这是最后一个已删除项，则自动收起列表
                          if (
                            outputs.filter(o => o.isDeleted).length === 1 &&
                            inputs.filter(p => p.isDeleted).length === 0
                          ) {
                            setShowDeleted(false);
                          }
                        }}
                      >
                        <span className="text-tf-base-subtext-lmode dark:text-tf-base-subtext group-hover:text-tf-base-bg1 dark:group-hover:text-tf-base-white transition-colors">
                          {output.title}
                        </span>
                        <span className="text-tf-accent-primary text-sm group-hover:text-tf-accent-primary-light">
                          Restore
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TFNode;
