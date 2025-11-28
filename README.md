# FFmpeg.js Video Converter Demo

A modern web application that demonstrates the power of FFmpeg.js for client-side video processing using WebAssembly. Convert videos directly in your browser without any server required!

## Features

- 🎬 **Client-side video conversion** using FFmpeg.js and WebAssembly
- 🎯 **Multiple quality presets** for both video and audio
- 📱 **Responsive design** that works on desktop and mobile
- 🔄 **Real-time conversion progress** tracking
- 🎨 **Modern UI** with glassmorphism design
- 🚀 **Web Workers** for non-blocking performance
- 📐 **Aspect ratio preservation** option
- 📁 **Multiple output formats** (MP4, WebM, AVI, MOV)

## Quality Options

### Video Quality
- **Low**: Fast encoding with CRF 28
- **Medium**: Balanced quality with CRF 23
- **High**: High quality with CRF 18
- **Lossless**: Maximum quality with CRF 0

### Audio Quality
- **Low**: 64k bitrate
- **Medium**: 128k bitrate
- **High**: 192k bitrate
- **Lossless**: FLAC encoding

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## How It Works

1. **Upload**: Select a video file from your device
2. **Configure**: Choose your desired video quality, audio quality, and output format
3. **Convert**: Click convert and watch the real-time progress
4. **Download**: The converted file automatically downloads when complete

## Technical Details

- **Frontend**: React 18 + TypeScript + Vite
- **Video Processing**: FFmpeg.js with WebAssembly
- **Performance**: Web Workers for background processing
- **Styling**: Modern CSS with gradients and glassmorphism
- **Security**: CORS headers configured for SharedArrayBuffer

## Browser Compatibility

This app requires browsers that support:
- WebAssembly (WASM)
- SharedArrayBuffer
- Web Workers
- Modern ES6+ features

Recommended browsers:
- Chrome 86+
- Firefox 79+
- Safari 14+
- Edge 86+

## File Size Limitations

Due to browser memory constraints, it's recommended to use videos under 100MB for optimal performance.

## License

MIT License - Feel free to use this code for your own projects!