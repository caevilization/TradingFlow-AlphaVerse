import React from 'react';
import Navbar from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/landing-bg.jpg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/windmill');
  };

  return (
    <div
      className="min-h-screen relative bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(17, 24, 39, 0.4), rgba(31, 41, 55, 0.4)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-6xl font-bold mb-6">TradingFlow</h1>
        <p className="text-xl mb-10">Empowing Everyone to Become an Auto-trading Master!</p>

        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-gradient-to-r from-tf-gradient-1-from to-tf-gradient-1-to 
             hover:from-tf-gradient-1-violet/90 hover:to-tf-accent-violet/90
             text-white rounded-lg transition-colors font-bold"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
