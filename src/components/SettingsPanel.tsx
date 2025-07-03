import React, { useState } from 'react';
import { X, Save, Key, Shield, Cpu, Eye, EyeOff } from 'lucide-react';
import { ObfuscationConfig } from '../App';

interface SettingsPanelProps {
  config: ObfuscationConfig;
  onConfigChange: (config: ObfuscationConfig) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  config,
  onConfigChange,
  onClose
}) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    onConfigChange(localConfig);
    onClose();
  };

  const handleChange = (key: keyof ObfuscationConfig, value: any) => {
    setLocalConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Key className="w-4 h-4 mr-2" />
              API Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  OpenAI API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={localConfig.openaiApiKey}
                    onChange={(e) => handleChange('openaiApiKey', e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2 top-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Required for AI-powered code mutation
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <Cpu className="w-4 h-4 mr-2" />
              License & Protection
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  License Key
                </label>
                <input
                  type="text"
                  value={localConfig.licenseKey}
                  onChange={(e) => handleChange('licenseKey', e.target.value)}
                  placeholder="Enter license key..."
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Binds the executable to this license
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="hardwareBinding"
                  checked={localConfig.hardwareBinding}
                  onChange={(e) => handleChange('hardwareBinding', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="hardwareBinding" className="text-sm text-gray-300">
                  Enable hardware binding
                </label>
              </div>
              <p className="text-xs text-gray-400 ml-7">
                Restricts execution to specific hardware
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};