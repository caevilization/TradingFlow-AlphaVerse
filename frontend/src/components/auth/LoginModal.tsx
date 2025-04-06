import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onGoogleLogin }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 背景遮罩 */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* 弹窗容器 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-tf-base-bg1-lmode dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2">
          {/* 标题栏 */}
          <div className="flex items-center justify-between p-6 border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2">
            <Dialog.Title className="text-xl font-semibold text-tf-base-text-lmode dark:text-tf-base-text">
              Connect Wallet
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-tf-base-bg2-lmode dark:hover:bg-tf-base-bg2 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-tf-base-subtext-lmode dark:text-tf-base-subtext" />
            </button>
          </div>

          {/* 登录选项 */}
          <div className="p-6 space-y-4">
            {/* Google 登录 */}
            <button
              onClick={onGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border border-tf-base-bg2-lmode dark:border-tf-base-bg2 hover:bg-tf-base-bg2-lmode dark:hover:bg-tf-base-bg2 transition-colors text-tf-base-text-lmode dark:text-tf-base-text"
            >
              <img src="/google.svg" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            {/* Metamask 登录（禁用） */}
            <button
              disabled
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border border-tf-base-bg2-lmode dark:border-tf-base-bg2 opacity-50 cursor-not-allowed text-tf-base-text-lmode dark:text-tf-base-text"
            >
              <img src="/MetaMask_Fox.svg" className="w-5 h-5" />
              <span>Connect with Metamask</span>
            </button>

            {/* OKX Wallet（禁用） */}
            {/* <button
              disabled
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border border-tf-base-bg2-lmode dark:border-tf-base-bg2 opacity-50 cursor-not-allowed text-tf-base-text-lmode dark:text-tf-base-text"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect with OKX Wallet</span>
            </button> */}
          </div>

          {/* 底部提示 */}
          <div className="px-6 pb-6">
            <p className="text-sm text-tf-base-subtext-lmode dark:text-tf-base-subtext text-center">
              More login methods coming soon...
            </p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LoginModal;
