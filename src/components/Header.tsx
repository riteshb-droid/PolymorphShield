import React from 'react';
import { Shield, Settings, Github, Zap, Code } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-blue-400" />
              <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PolymorphShield</h1>
              <p className="text-sm text-gray-400">Universal Code Obfuscation Platform</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>30+ Languages</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Enterprise-Grade</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              title="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};