import type { NodeType } from './types';

export const nodeTypeColors: Record<NodeType, string> = {
  account: 'text-tf-accent-amber',
  compute: 'text-tf-accent-sky',
  action: 'text-tf-accent-emerald',
  input: 'text-tf-accent-violet',
  output: 'text-tf-accent-rose',
  default: 'text-tf-base-subtext'
} as const;
