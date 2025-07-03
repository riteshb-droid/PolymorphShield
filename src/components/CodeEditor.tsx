import React, { useState } from 'react';
import { Code, Copy, Check, Eye, EyeOff } from 'lucide-react';

interface CodeEditorProps {
  originalCode: string;
  obfuscatedCode: string;
  fileName: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  originalCode,
  obfuscatedCode,
  fileName
}) => {
  const [activeTab, setActiveTab] = useState<'original' | 'obfuscated'>('original');
  const [copied, setCopied] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const handleCopy = async () => {
    const codeToCopy = activeTab === 'original' ? originalCode : obfuscatedCode;
    await navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCodeWithLineNumbers = (code: string) => {
    const lines = code.split('\n');
    return (
      <div className="flex">
        {showLineNumbers && (
          <div className="select-none text-gray-500 text-right pr-4 border-r border-gray-700">
            {lines.map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
        )}
        <div className="flex-1 pl-4">
          {lines.map((line, index) => (
            <div key={index} className="leading-6">
              {line || ' '}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Code className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-white font-medium">
              {fileName || 'Code Editor'}
            </span>
          </div>
          
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('original')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                activeTab === 'original'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Original
            </button>
            <button
              onClick={() => setActiveTab('obfuscated')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                activeTab === 'obfuscated'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Obfuscated
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded"
            title="Toggle line numbers"
          >
            {showLineNumbers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className="h-96 overflow-auto bg-gray-900 p-4">
        {activeTab === 'original' ? (
          originalCode ? (
            <pre className="text-sm text-gray-300 font-mono">
              {renderCodeWithLineNumbers(originalCode)}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Upload a Python file to view code</p>
              </div>
            </div>
          )
        ) : (
          obfuscatedCode ? (
            <pre className="text-sm text-gray-300 font-mono">
              {renderCodeWithLineNumbers(obfuscatedCode)}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Run obfuscation to view results</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};