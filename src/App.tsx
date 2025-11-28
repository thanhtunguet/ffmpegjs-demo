import {useEffect, useState} from 'react';
import './App.css';
import {FileUpload} from './components/FileUpload';
import {ProgressBar} from './components/ProgressBar';
import {QualitySelector} from './components/QualitySelector';
import {useFFmpeg} from './hooks/useFFmpeg';
import {AudioQuality, ConversionSettings, OutputFormat, VideoQuality} from './types';

function App() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [settings, setSettings] = useState<ConversionSettings>({
        videoQuality: 'Medium',
        audioQuality: 'Medium',
        outputFormat: 'mp4',
        maintainAspectRatio: true
    });

    const {conversionState, convertVideo, cleanup} = useFFmpeg();

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
    };

    const handleConvert = () => {
        if (selectedFile) {
            convertVideo(selectedFile, settings);
        }
    };

    const updateSettings = (updates: Partial<ConversionSettings>) => {
        setSettings(prev => ({...prev, ...updates}));
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>🎬 FFmpeg.js Video Converter </h1>
                < p> Convert videos directly in your browser using WebAssembly</p>
            </header>

            < main className="app-main">
                <div className="converter-container">
                    <div className="upload-section">
                        <FileUpload
                            onFileSelect={handleFileSelect}
                            disabled={conversionState.isConverting}
                        />
                        {selectedFile && (
                            <div className="file-info">
                                <p>Selected: <strong>{selectedFile.name} < /strong></p>
                                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB </p>
                            </div>
                        )
                        }
                    </div>

                    < div className="settings-section">
                        <h3>Conversion Settings </h3>
                        < QualitySelector
                            videoQuality={settings.videoQuality}
                            audioQuality={settings.audioQuality}
                            outputFormat={settings.outputFormat}
                            maintainAspectRatio={settings.maintainAspectRatio}
                            onVideoQualityChange={(quality: VideoQuality) =>
                                updateSettings({videoQuality: quality})
                            }
                            onAudioQualityChange={(quality: AudioQuality) =>
                                updateSettings({audioQuality: quality})
                            }
                            onOutputFormatChange={(format: OutputFormat) =>
                                updateSettings({outputFormat: format})
                            }
                            onMaintainAspectRatioChange={(maintain: boolean) =>
                                updateSettings({maintainAspectRatio: maintain})
                            }
                            disabled={conversionState.isConverting}
                        />
                    </div>

                    < div className="convert-section">
                        <button
                            onClick={handleConvert}
                            disabled={!selectedFile || conversionState.isConverting}
                            className="convert-button"
                        >
                            {conversionState.isConverting ? 'Converting...' : 'Convert Video'}
                        </button>
                    </div>

                    < ProgressBar
                        progress={conversionState.progress}
                        isConverting={conversionState.isConverting}
                        error={conversionState.error}
                    />
                </div>

                < div className="features-section">
                    <h3>Features </h3>
                    < ul>
                        <li>✅ Client - side video conversion using FFmpeg.js</li>
                        <li>✅ Multiple quality presets for video and audio</li>
                        <li>✅ Support for multiple output formats</li>
                        <li>✅ Aspect ratio preservation</li>
                        <li>✅ Real - time conversion progress</li>
                        <li>✅ No server required - runs entirely in your browser</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default App;