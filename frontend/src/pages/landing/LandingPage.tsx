import React from 'react';
import Navbar from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import landingEffect from '../../assets/landing-effect.mp4';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/flow/funds');
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* 视频背景 */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={landingEffect} type="video/mp4" />
        </video>
        {/* 叠加渐变层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-600/10 to-gray-800/20" />
      </div>

      <Navbar variant="landing" />
      <div className="container mx-auto px-12 py-16 relative z-10">
        <h1 className="text-6xl font-bold mb-6">TradingFlow</h1>
        <p className="text-xl mb-10">Empowing Everyone to Become an Auto-trading Master!</p>

        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
