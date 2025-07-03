import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { CodeEditor } from './components/CodeEditor';
import { ObfuscationControls } from './components/ObfuscationControls';
import { ProcessLogs } from './components/ProcessLogs';
import { DownloadSection } from './components/DownloadSection';
import { SettingsPanel } from './components/SettingsPanel';
import { ObfuscationEngine } from './services/ObfuscationEngine';

export interface ProcessStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  message: string;
  timestamp: Date;
}

export interface ObfuscationConfig {
  variableRenaming: boolean;
  junkCodeInjection: boolean;
  aiMutation: boolean;
  canaryInjection: boolean;
  executableGeneration: boolean;
  hardwareBinding: boolean;
  licenseKey: string;
  openaiApiKey: string;
}

function App() {
  const [originalCode, setOriginalCode] = useState<string>('');
  const [obfuscatedCode, setObfuscatedCode] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<ObfuscationConfig>({
    variableRenaming: true,
    junkCodeInjection: true,
    aiMutation: false,
    canaryInjection: true,
    executableGeneration: true,
    hardwareBinding: false,
    licenseKey: '',
    openaiApiKey: ''
  });

  const handleFileUpload = useCallback((file: File, content: string) => {
    setFileName(file.name);
    setOriginalCode(content);
    setObfuscatedCode('');
    setProcessSteps([]);
  }, []);

  const updateProcessStep = useCallback((stepId: string, status: ProcessStep['status'], message: string) => {
    setProcessSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status, message, timestamp: new Date() }
        : step
    ));
  }, []);

  const addProcessStep = useCallback((step: Omit<ProcessStep, 'timestamp'>) => {
    setProcessSteps(prev => [...prev, { ...step, timestamp: new Date() }]);
  }, []);

  const handleObfuscate = useCallback(async () => {
    if (!originalCode) return;

    setIsProcessing(true);
    setObfuscatedCode('');
    setProcessSteps([]);

    const engine = new ObfuscationEngine(config);
    
    try {
      const result = await engine.obfuscate(originalCode, {
        onStepStart: (stepId, name) => {
          addProcessStep({
            id: stepId,
            name,
            status: 'running',
            message: `Starting ${name.toLowerCase()}...`
          });
        },
        onStepComplete: (stepId, message) => {
          updateProcessStep(stepId, 'completed', message);
        },
        onStepError: (stepId, error) => {
          updateProcessStep(stepId, 'error', error);
        }
      }, fileName);

      setObfuscatedCode(result.code);
    } catch (error) {
      console.error('Obfuscation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalCode, config, fileName, addProcessStep, updateProcessStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <Header onSettingsClick={() => setShowSettings(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload onFileUpload={handleFileUpload} />
            <ObfuscationControls 
              config={config}
              onConfigChange={setConfig}
              onObfuscate={handleObfuscate}
              isProcessing={isProcessing}
              hasCode={!!originalCode}
            />
          </div>

          {/* Middle Column - Code Editor */}
          <div className="lg:col-span-1">
            <CodeEditor
              originalCode={originalCode}
              obfuscatedCode={obfuscatedCode}
              fileName={fileName}
            />
          </div>

          {/* Right Column - Process Logs and Download */}
          <div className="lg:col-span-1 space-y-6">
            <ProcessLogs steps={processSteps} />
            <DownloadSection
              obfuscatedCode={obfuscatedCode}
              fileName={fileName}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </main>

      {showSettings && (
        <SettingsPanel
          config={config}
          onConfigChange={setConfig}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;