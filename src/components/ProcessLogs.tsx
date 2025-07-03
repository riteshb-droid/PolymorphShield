import React from 'react';
import { CheckCircle, XCircle, Clock, Loader2, Activity } from 'lucide-react';
import { ProcessStep } from '../App';

interface ProcessLogsProps {
  steps: ProcessStep[];
}

export const ProcessLogs: React.FC<ProcessLogsProps> = ({ steps }) => {
  const getStatusIcon = (status: ProcessStep['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'running':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ProcessStep['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-400';
      case 'running':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2" />
        Process Logs
      </h2>
      
      {steps.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No process running</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${getStatusColor(step.status)}`}>
                    {step.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {step.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{step.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};