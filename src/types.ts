export type VideoQuality = 'Low' | 'Medium' | 'High' | 'Lossless';
export type AudioQuality = 'Low' | 'Medium' | 'High' | 'Lossless';
export type OutputFormat = 'mp4' | 'webm' | 'avi' | 'mov';

export interface ConversionSettings {
  videoQuality: VideoQuality;
  audioQuality: AudioQuality;
  outputFormat: OutputFormat;
  maintainAspectRatio: boolean;
}

export interface ConversionProgress {
  progress: number;
  isConverting: boolean;
  error?: string;
}