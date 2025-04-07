import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Moon, Sun, ShoppingBag } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../auth/LoginModal';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error) {
      console.error('Login failed:', error);
    }
    setIsLoginModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const commonButtonClass = "p-2 rounded-lg hover:bg-tf-base-bg2-lmode dark:hover:bg-tf-base-bg2 transition-colors";
  const commonTextClass = "text-tf-base-subtext-lmode dark:text-tf-base-subtext";

  return (
    <nav className="bg-tf-base-bg1-lmode dark:bg-tf-base-bg1 border-b border-tf-base-bg2-lmode dark:border-tf-base-bg2">
      <div className="relative h-16 px-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <div
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="/TF-LOGO_TRANS.png"
              alt="TradingFlow Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to bg-clip-text text-transparent">
              TradingFlow
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/flow/funds')}
            className={`${commonButtonClass} ${commonTextClass}`}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        
          <button
            onClick={toggleTheme}
            className={commonButtonClass}
          >
            {theme === 'dark' ? (
              <Sun className={`w-5 h-5 ${commonTextClass}`} />
            ) : (
              <Moon className={`w-5 h-5 ${commonTextClass}`} />
            )}
          </button>
          {user ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center">
                <div className="w-8 h-8 overflow-hidden rounded-full border-2 border-white mr-1">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to flex items-center justify-center text-white">
                      {user.username?.[0]}
                    </div>
                  )}
                </div>
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-tf-base-bg1 border border-tf-base-bg2-lmode dark:border-tf-base-bg2 rounded-lg shadow-lg py-1 z-50">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/profile')}
                      className={`${
                        active ? 'bg-tf-base-bg2-lmode dark:bg-tf-base-bg2' : ''
                      } block w-full text-left px-4 py-2 text-sm text-tf-base-text-lmode dark:text-tf-base-text`}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-tf-base-bg2-lmode dark:bg-tf-base-bg2' : ''
                      } block w-full text-left px-4 py-2 text-sm text-red-600`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </button>
              <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onGoogleLogin={handleGoogleLogin}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
