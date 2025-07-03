import React, { useState } from 'react';
import { Download, FileCode, Package, AlertTriangle, Info } from 'lucide-react';

interface DownloadSectionProps {
  obfuscatedCode: string;
  fileName: string;
  isProcessing: boolean;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  obfuscatedCode,
  fileName,
  isProcessing
}) => {
  const [downloadFormat, setDownloadFormat] = useState<'source' | 'exe'>('source');

  const getLanguageInfo = () => {
    const extension = fileName.toLowerCase().match(/\.([^.]+)$/)?.[1] || '';
    
    const languageMap: Record<string, { name: string; executable: string; tool: string; description: string }> = {
      // Web Languages
      'js': { name: 'JavaScript', executable: '.exe', tool: 'Node.js/pkg', description: 'Requires Node.js and pkg for executable generation' },
      'ts': { name: 'TypeScript', executable: '.exe', tool: 'Node.js/pkg', description: 'Requires TypeScript compilation and pkg' },
      'jsx': { name: 'React JSX', executable: '.exe', tool: 'Electron', description: 'Requires Electron for desktop app packaging' },
      'tsx': { name: 'React TSX', executable: '.exe', tool: 'Electron', description: 'Requires Electron for desktop app packaging' },
      'vue': { name: 'Vue.js', executable: '.exe', tool: 'Electron', description: 'Requires Electron for desktop app packaging' },
      'svelte': { name: 'Svelte', executable: '.exe', tool: 'Electron', description: 'Requires Electron for desktop app packaging' },
      
      // Backend Languages
      'py': { name: 'Python', executable: '.exe', tool: 'PyInstaller', description: 'Requires PyInstaller for executable generation' },
      'java': { name: 'Java', executable: '.jar/.exe', tool: 'Maven/Gradle', description: 'Requires Maven/Gradle and JRE for compilation' },
      'c': { name: 'C', executable: '.exe', tool: 'GCC/Clang', description: 'Requires GCC or Clang compiler' },
      'cpp': { name: 'C++', executable: '.exe', tool: 'GCC/Clang', description: 'Requires GCC or Clang compiler' },
      'cc': { name: 'C++', executable: '.exe', tool: 'GCC/Clang', description: 'Requires GCC or Clang compiler' },
      'cxx': { name: 'C++', executable: '.exe', tool: 'GCC/Clang', description: 'Requires GCC or Clang compiler' },
      'cs': { name: 'C#', executable: '.exe', tool: '.NET Core', description: 'Requires .NET Core SDK for compilation' },
      'go': { name: 'Go', executable: '.exe', tool: 'Go Build', description: 'Requires Go compiler for executable generation' },
      'rs': { name: 'Rust', executable: '.exe', tool: 'Cargo', description: 'Requires Rust toolchain and Cargo' },
      'php': { name: 'PHP', executable: '.phar', tool: 'PHP Phar', description: 'Requires PHP for Phar archive creation' },
      'rb': { name: 'Ruby', executable: '.exe', tool: 'Ruby Gem', description: 'Requires Ruby and gem packaging tools' },
      'swift': { name: 'Swift', executable: '.app/.exe', tool: 'Xcode', description: 'Requires Xcode or Swift compiler' },
      'kt': { name: 'Kotlin', executable: '.jar/.exe', tool: 'Gradle', description: 'Requires Kotlin compiler and Gradle' },
      'scala': { name: 'Scala', executable: '.jar', tool: 'SBT', description: 'Requires Scala compiler and SBT' },
      
      // Functional Languages
      'hs': { name: 'Haskell', executable: '.exe', tool: 'GHC', description: 'Requires Glasgow Haskell Compiler' },
      'ml': { name: 'OCaml', executable: '.exe', tool: 'OCaml', description: 'Requires OCaml compiler' },
      'fs': { name: 'F#', executable: '.exe', tool: '.NET Core', description: 'Requires .NET Core SDK' },
      'clj': { name: 'Clojure', executable: '.jar', tool: 'Leiningen', description: 'Requires Leiningen build tool' },
      'elm': { name: 'Elm', executable: '.js', tool: 'Elm Make', description: 'Compiles to JavaScript' },
      
      // System Languages
      'asm': { name: 'Assembly', executable: '.exe', tool: 'NASM/GAS', description: 'Requires assembler and linker' },
      's': { name: 'Assembly', executable: '.exe', tool: 'GAS', description: 'Requires GNU Assembler' },
      
      // Scripting Languages
      'sh': { name: 'Shell Script', executable: '.sh', tool: 'Shell', description: 'Executable shell script' },
      'bash': { name: 'Bash', executable: '.sh', tool: 'Bash', description: 'Executable bash script' },
      'ps1': { name: 'PowerShell', executable: '.ps1', tool: 'PowerShell', description: 'PowerShell script file' },
      'lua': { name: 'Lua', executable: '.exe', tool: 'Lua Compiler', description: 'Requires Lua compiler' },
      'perl': { name: 'Perl', executable: '.exe', tool: 'PAR::Packer', description: 'Requires PAR::Packer for executable' },
      'pl': { name: 'Perl', executable: '.exe', tool: 'PAR::Packer', description: 'Requires PAR::Packer for executable' },
      
      // Data Languages
      'sql': { name: 'SQL', executable: '.sql', tool: 'Database', description: 'SQL script file' },
      'r': { name: 'R', executable: '.exe', tool: 'R Package', description: 'Requires R and packaging tools' },
      'm': { name: 'MATLAB', executable: '.exe', tool: 'MATLAB Compiler', description: 'Requires MATLAB Compiler Runtime' },
      
      // Mobile
      'dart': { name: 'Dart', executable: '.exe', tool: 'Dart Compile', description: 'Requires Dart SDK' },
      
      // Other
      'vb': { name: 'Visual Basic', executable: '.exe', tool: '.NET Framework', description: 'Requires .NET Framework' },
      'pas': { name: 'Pascal', executable: '.exe', tool: 'Free Pascal', description: 'Requires Free Pascal compiler' },
      'd': { name: 'D', executable: '.exe', tool: 'DMD/LDC', description: 'Requires D compiler' },
      'nim': { name: 'Nim', executable: '.exe', tool: 'Nim Compiler', description: 'Requires Nim compiler' },
      'zig': { name: 'Zig', executable: '.exe', tool: 'Zig Build', description: 'Requires Zig compiler' }
    };

    return languageMap[extension] || { 
      name: 'Unknown', 
      executable: '.exe', 
      tool: 'Generic Compiler', 
      description: 'Requires appropriate compiler for this language' 
    };
  };

  const getFileExtension = () => {
    const match = fileName.match(/\.([^.]+)$/);
    return match ? match[0] : '.txt';
  };

  const handleDownload = (format: 'source' | 'exe') => {
    if (!obfuscatedCode) return;

    const languageInfo = getLanguageInfo();
    const baseName = fileName.replace(/\.[^.]+$/, '');

    if (format === 'source') {
      const blob = new Blob([obfuscatedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}_obfuscated${getFileExtension()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Simulate executable download
      const mockExeContent = `# Compiled executable metadata
# Original file: ${fileName}
# Language: ${languageInfo.name}
# Build tool: ${languageInfo.tool}
# Obfuscated code length: ${obfuscatedCode.length} characters
# Generated by: PolymorphShield

# This would be a compiled executable in production
# The actual compilation would be handled by ${languageInfo.tool}`;

      const blob = new Blob([mockExeContent], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}_obfuscated${languageInfo.executable}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const languageInfo = getLanguageInfo();

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Download className="w-5 h-5 mr-2" />
        Download Results
      </h2>
      
      {!obfuscatedCode && !isProcessing ? (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Complete obfuscation to download</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Language Info */}
          <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Detected Language</span>
              <span className="text-sm text-blue-400">{languageInfo.name}</span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <Info className="w-3 h-3 mr-1" />
              <span>Build tool: {languageInfo.tool}</span>
            </div>
          </div>

          {/* Format Selection */}
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setDownloadFormat('source')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
                downloadFormat === 'source'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Source Code</span>
            </button>
            <button
              onClick={() => setDownloadFormat('exe')}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded text-sm transition-colors ${
                downloadFormat === 'exe'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Executable</span>
            </button>
          </div>
          
          {/* Download Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleDownload('source')}
              disabled={!obfuscatedCode || isProcessing}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                !obfuscatedCode || isProcessing
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Download {getFileExtension()}</span>
            </button>
            
            <button
              onClick={() => handleDownload('exe')}
              disabled={!obfuscatedCode || isProcessing}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                !obfuscatedCode || isProcessing
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Download {languageInfo.executable}</span>
            </button>
          </div>
          
          {/* Build Tool Info */}
          {downloadFormat === 'exe' && (
            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-yellow-300">
                <p className="font-medium">{languageInfo.tool} Required</p>
                <p>{languageInfo.description}</p>
              </div>
            </div>
          )}

          {/* Additional Features */}
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
            <h4 className="text-sm font-medium text-blue-300 mb-2">Obfuscation Features Applied:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Variable Renaming
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Junk Code Injection
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                AI Code Mutation
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Anti-Tampering
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};