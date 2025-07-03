import React from 'react';
import { Play, Pause, RotateCcw, Settings, Zap } from 'lucide-react';
import { ObfuscationConfig } from '../App';

interface ObfuscationControlsProps {
  config: ObfuscationConfig;
  onConfigChange: (config: ObfuscationConfig) => void;
  onObfuscate: () => void;
  isProcessing: boolean;
  hasCode: boolean;
}

export const ObfuscationControls: React.FC<ObfuscationControlsProps> = ({
  config,
  onConfigChange,
  onObfuscate,
  isProcessing,
  hasCode
}) => {
  const toggleOption = (key: keyof ObfuscationConfig) => {
    if (typeof config[key] === 'boolean') {
      onConfigChange({
        ...config,
        [key]: !config[key]
      });
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Settings className="w-5 h-5 mr-2" />
        Obfuscation Options
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.variableRenaming}
              onChange={() => toggleOption('variableRenaming')}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Variable Renaming</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.junkCodeInjection}
              onChange={() => toggleOption('junkCodeInjection')}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Junk Code Injection</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.aiMutation}
              onChange={() => toggleOption('aiMutation')}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300 flex items-center">
              AI Mutation
              <Zap className="w-3 h-3 ml-1 text-yellow-400" />
            </span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.canaryInjection}
              onChange={() => toggleOption('canaryInjection')}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Canary Injection</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.executableGeneration}
              onChange={() => toggleOption('executableGeneration')}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Executable Generation</span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.hardwareBinding}
              onChange={() => toggleOption('hardwareBinding')}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">Hardware Binding</span>
          </label>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={onObfuscate}
            disabled={!hasCode || isProcessing}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              !hasCode || isProcessing
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <>
                <Pause className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Obfuscation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};