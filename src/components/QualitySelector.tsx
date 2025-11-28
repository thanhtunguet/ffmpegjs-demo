import React from 'react';
import { VideoQuality, AudioQuality, OutputFormat } from '../types';

interface QualitySelectorProps {
  videoQuality: VideoQuality;
  audioQuality: AudioQuality;
  outputFormat: OutputFormat;
  maintainAspectRatio: boolean;
  onVideoQualityChange: (quality: VideoQuality) => void;
  onAudioQualityChange: (quality: AudioQuality) => void;
  onOutputFormatChange: (format: OutputFormat) => void;
  onMaintainAspectRatioChange: (maintain: boolean) => void;
  disabled?: boolean;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({
  videoQuality,
  audioQuality,
  outputFormat,
  maintainAspectRatio,
  onVideoQualityChange,
  onAudioQualityChange,
  onOutputFormatChange,
  onMaintainAspectRatioChange,
  disabled = false
}) => {
  const videoQualities: VideoQuality[] = ['Low', 'Medium', 'High', 'Lossless'];
  const audioQualities: AudioQuality[] = ['Low', 'Medium', 'High', 'Lossless'];
  const outputFormats: OutputFormat[] = ['mp4', 'webm', 'avi', 'mov'];

  return (
    <div className="quality-selector">
      <div className="quality-group">
        <label htmlFor="video-quality">Video Quality:</label>
        <select
          id="video-quality"
          value={videoQuality}
          onChange={(e) => onVideoQualityChange(e.target.value as VideoQuality)}
          disabled={disabled}
        >
          {videoQualities.map(quality => (
            <option key={quality} value={quality}>
              {quality}
            </option>
          ))}
        </select>
      </div>

      <div className="quality-group">
        <label htmlFor="audio-quality">Audio Quality:</label>
        <select
          id="audio-quality"
          value={audioQuality}
          onChange={(e) => onAudioQualityChange(e.target.value as AudioQuality)}
          disabled={disabled}
        >
          {audioQualities.map(quality => (
            <option key={quality} value={quality}>
              {quality}
            </option>
          ))}
        </select>
      </div>

      <div className="quality-group">
        <label htmlFor="output-format">Output Format:</label>
        <select
          id="output-format"
          value={outputFormat}
          onChange={(e) => onOutputFormatChange(e.target.value as OutputFormat)}
          disabled={disabled}
        >
          {outputFormats.map(format => (
            <option key={format} value={format}>
              {format.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="quality-group checkbox-group">
        <label htmlFor="maintain-aspect-ratio">
          <input
            id="maintain-aspect-ratio"
            type="checkbox"
            checked={maintainAspectRatio}
            onChange={(e) => onMaintainAspectRatioChange(e.target.checked)}
            disabled={disabled}
          />
          Maintain Aspect Ratio
        </label>
      </div>
    </div>
  );
};