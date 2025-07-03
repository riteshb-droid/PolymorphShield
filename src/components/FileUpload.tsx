import React, { useCallback, useState } from 'react';
import { Upload, File, X, AlertCircle, Code } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File, content: string) => void;
}

const SUPPORTED_LANGUAGES = {
  // Web Languages
  '.js': { name: 'JavaScript', color: 'text-yellow-400' },
  '.ts': { name: 'TypeScript', color: 'text-blue-400' },
  '.jsx': { name: 'React JSX', color: 'text-cyan-400' },
  '.tsx': { name: 'React TSX', color: 'text-cyan-400' },
  '.vue': { name: 'Vue.js', color: 'text-green-400' },
  '.svelte': { name: 'Svelte', color: 'text-orange-400' },
  
  // Backend Languages
  '.py': { name: 'Python', color: 'text-blue-400' },
  '.java': { name: 'Java', color: 'text-red-400' },
  '.c': { name: 'C', color: 'text-gray-400' },
  '.cpp': { name: 'C++', color: 'text-blue-400' },
  '.cc': { name: 'C++', color: 'text-blue-400' },
  '.cxx': { name: 'C++', color: 'text-blue-400' },
  '.cs': { name: 'C#', color: 'text-purple-400' },
  '.go': { name: 'Go', color: 'text-cyan-400' },
  '.rs': { name: 'Rust', color: 'text-orange-400' },
  '.php': { name: 'PHP', color: 'text-purple-400' },
  '.rb': { name: 'Ruby', color: 'text-red-400' },
  '.swift': { name: 'Swift', color: 'text-orange-400' },
  '.kt': { name: 'Kotlin', color: 'text-purple-400' },
  '.scala': { name: 'Scala', color: 'text-red-400' },
  
  // Functional Languages
  '.hs': { name: 'Haskell', color: 'text-purple-400' },
  '.ml': { name: 'OCaml', color: 'text-orange-400' },
  '.fs': { name: 'F#', color: 'text-blue-400' },
  '.clj': { name: 'Clojure', color: 'text-green-400' },
  '.elm': { name: 'Elm', color: 'text-blue-400' },
  
  // System Languages
  '.asm': { name: 'Assembly', color: 'text-gray-400' },
  '.s': { name: 'Assembly', color: 'text-gray-400' },
  
  // Scripting Languages
  '.sh': { name: 'Shell Script', color: 'text-green-400' },
  '.bash': { name: 'Bash', color: 'text-green-400' },
  '.ps1': { name: 'PowerShell', color: 'text-blue-400' },
  '.lua': { name: 'Lua', color: 'text-blue-400' },
  '.perl': { name: 'Perl', color: 'text-blue-400' },
  '.pl': { name: 'Perl', color: 'text-blue-400' },
  
  // Data Languages
  '.sql': { name: 'SQL', color: 'text-blue-400' },
  '.r': { name: 'R', color: 'text-blue-400' },
  '.m': { name: 'MATLAB', color: 'text-orange-400' },
  
  // Mobile
  '.dart': { name: 'Dart', color: 'text-blue-400' },
  
  // Other
  '.vb': { name: 'Visual Basic', color: 'text-blue-400' },
  '.pas': { name: 'Pascal', color: 'text-blue-400' },
  '.d': { name: 'D', color: 'text-red-400' },
  '.nim': { name: 'Nim', color: 'text-yellow-400' },
  '.zig': { name: 'Zig', color: 'text-orange-400' }
};

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileRead = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(file, content);
      setUploadedFile(file);
      setError('');
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsText(file);
  }, [onFileUpload]);

  const getFileExtension = (fileName: string): string => {
    const match = fileName.match(/(\.[^.]+)$/);
    return match ? match[1].toLowerCase() : '';
  };

  const isValidFile = (fileName: string) => {
    const extension = getFileExtension(fileName);
    return Object.keys(SUPPORTED_LANGUAGES).includes(extension);
  };

  const getLanguageInfo = (fileName: string) => {
    const extension = getFileExtension(fileName);
    return SUPPORTED_LANGUAGES[extension as keyof typeof SUPPORTED_LANGUAGES] || { name: 'Unknown', color: 'text-gray-400' };
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => isValidFile(file.name));
    
    if (validFile) {
      handleFileRead(validFile);
    } else {
      setError('Please upload a supported programming language file');
    }
  }, [handleFileRead]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isValidFile(file.name)) {
        handleFileRead(file);
      } else {
        setError('Please upload a supported programming language file');
      }
    }
  }, [handleFileRead]);

  const clearFile = useCallback(() => {
    setUploadedFile(null);
    setError('');
  }, []);

  const supportedExtensions = Object.keys(SUPPORTED_LANGUAGES).join(',');

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Upload className="w-5 h-5 mr-2" />
        Upload Source Code
      </h2>
      
      {uploadedFile ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center">
              <Code className={`w-4 h-4 mr-2 ${getLanguageInfo(uploadedFile.name).color}`} />
              <div>
                <span className="text-white text-sm">{uploadedFile.name}</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs ${getLanguageInfo(uploadedFile.name).color}`}>
                    {getLanguageInfo(uploadedFile.name).name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">Language Features:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Variable Renaming
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Code Injection
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                AI Mutation
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Anti-Tampering
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-400 bg-blue-400/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Drag and drop your source code here</p>
          <p className="text-gray-500 text-sm mb-4">
            Supports 30+ programming languages including Python, JavaScript, Java, C++, Go, Rust, and more
          </p>
          <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Browse Files
            <input
              type="file"
              accept={supportedExtensions}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {Object.entries(SUPPORTED_LANGUAGES).slice(0, 12).map(([ext, info]) => (
              <div key={ext} className="flex items-center text-gray-400">
                <div className={`w-2 h-2 rounded-full mr-2 ${info.color.replace('text-', 'bg-')}`}></div>
                {info.name}
              </div>
            ))}
            <div className="text-gray-500 italic">+18 more...</div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};