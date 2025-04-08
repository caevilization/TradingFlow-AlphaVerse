import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Moon, Sun, ShoppingBag } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../auth/LoginModal';

interface NavbarProps {
  variant?: 'landing' | 'default';
  onAiToggle?: () => void;
  isAiOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'default', onAiToggle, isAiOpen }) => {
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

  const isLanding = variant === 'landing';
  const navHeight = isLanding ? 'h-20' : 'h-16';
  const textColor = isLanding ? 'text-white' : 'text-tf-base-subtext-lmode dark:text-tf-base-subtext';
  const iconSize = isLanding ? 'w-6 h-6' : 'w-5 h-5';
  const logoSize = isLanding ? 'h-10 w-10' : 'h-8 w-8';
  const brandTextSize = isLanding ? 'text-2xl' : 'text-xl';
  const navBackground = isLanding ? 'bg-transparent' : 'bg-white dark:bg-tf-base-bg2';
  const navPosition = isLanding ? '' : 'fixed top-0 left-0 right-0';
  const navBorder = isLanding ? '' : 'border-b border-tf-base-bg2-lmode/100 dark:border-tf-base-bg2/10';

  return (
    <nav className={`${navPosition} z-50 ${navBackground} ${navBorder}`}>
      <div className={`relative ${navHeight} px-6 flex items-center justify-between ${!isLanding && 'backdrop-blur-sm'}`}>
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <div
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="/TF-LOGO_TRANS.png"
              alt="TradingFlow Logo"
              className={logoSize}
            />
            <span className={`${brandTextSize} font-bold tracking-wide bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to bg-clip-text text-transparent`}>
              TradingFlow
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
        

          <button
            onClick={() => navigate('/flow/funds')}
            className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${textColor}`}
          >
            <ShoppingBag className={iconSize} />
          </button>
        
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className={`${iconSize} ${isLanding ? 'text-white' : textColor}`} />
            ) : (
              <Moon className={`${iconSize} ${isLanding ? 'text-white' : textColor}`} />
            )}
          </button>
          {user ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center">
                <div className={`${isLanding ? 'w-10 h-10' : 'w-8 h-8'} overflow-hidden rounded-full border-2 border-white mr-1`}>
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
                <ChevronDownIcon className={`${iconSize} ${textColor}`} />
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
                className={`px-6 py-2 ${isLanding ? 'text-base' : 'text-m'} font-medium text-white bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to rounded-lg hover:opacity-90 transition-opacity`}
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
