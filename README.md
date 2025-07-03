# PolymorphShield

A powerful AI-powered code obfuscation tool that supports both Python and JavaScript files. PolymorphShield provides advanced obfuscation techniques to protect your source code from reverse engineering.
link to website-https://polymorphshield.netlify.app/
## Features

### Multi-Language Support
- **Python (.py)** - Full obfuscation with PyInstaller executable generation
- **JavaScript (.js/.ts)** - Advanced obfuscation with Node.js/Electron packaging

### Obfuscation Techniques
- **Variable Renaming** - Replaces meaningful variable and function names with cryptic identifiers
- **Junk Code Injection** - Adds decoy functions and dummy variables to confuse analysis
- **AI Mutation** - Uses OpenAI API to restructure code logic while maintaining functionality
- **Canary Injection** - Embeds anti-tampering functions that detect code modification
- **Executable Generation** - Compiles obfuscated code into standalone executables

### Advanced Protection
- **Hardware Binding** - Restricts execution to specific hardware configurations
- **License Key Integration** - Embeds license validation into the obfuscated code
- **Real-time Process Monitoring** - Shows detailed logs of each obfuscation step

## Getting Started

### Prerequisites
- Node.js 16+ for development
- OpenAI API key (optional, for AI mutation features)
- PyInstaller (for Python executable generation)
- pkg or Electron (for JavaScript executable generation)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Usage
1. Upload your Python (.py) or JavaScript (.js/.ts) file
2. Configure obfuscation options in the settings panel
3. Click "Start Obfuscation" to begin the process
4. Download the obfuscated source code or compiled executable

## Making Changes

### Development Workflow
1. **Local Development**: Make changes to the source code in the `src/` directory
2. **Testing**: Test your changes locally with `npm run dev`
3. **Building**: Create a production build with `npm run build`
4. **Deployment**: Deploy to Netlify or your preferred hosting platform

### File Structure
```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── FileUpload.tsx
│   ├── CodeEditor.tsx
│   ├── ObfuscationControls.tsx
│   ├── ProcessLogs.tsx
│   ├── DownloadSection.tsx
│   └── SettingsPanel.tsx
├── services/           # Business logic
│   └── ObfuscationEngine.ts
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

### Adding New Features
1. **New Obfuscation Techniques**: Extend the `ObfuscationEngine` class
2. **UI Components**: Add new components in the `components/` directory
3. **Language Support**: Update file validation and obfuscation logic
4. **Configuration Options**: Extend the `ObfuscationConfig` interface

#### Environment Variables
- `VITE_OPENAI_API_KEY`: OpenAI API key for AI mutation features
- `VITE_APP_VERSION`: Application version number

## Configuration

### OpenAI Integration
To enable AI-powered code mutation:
1. Obtain an OpenAI API key from https://platform.openai.com/
2. Add the key in the Settings panel
3. Enable "AI Mutation" in obfuscation options

### Hardware Binding
Enable hardware binding to restrict code execution:
1. Check "Hardware Binding" in settings
2. The obfuscated code will include hardware fingerprinting
3. Code will only run on the machine where it was obfuscated

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **License Keys**: Use secure random generation for license keys
- **Canary Functions**: Regularly update canary logic to prevent bypass
- **Executable Signing**: Sign executables for distribution in production

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Push to your fork and create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and feature requests, please use the GitHub issue tracker or contact support through the application interface.
