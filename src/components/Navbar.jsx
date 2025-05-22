import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <nav className="fixed w-full z-50 top-0 bg-[#2a3036] border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link to="/dashboard">
              <img 
                src="https://funnelmates.com/wp-content/uploads/2025/05/PuzzleVersedLogo-1.png" 
                alt="PuzzleVersed" 
                className="h-12"
              />
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
