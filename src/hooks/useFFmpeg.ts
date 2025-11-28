import { useState, useRef, useCallback } from 'react';
import { useCallback, useState } from 'react';
import { ConversionSettings, ConversionProgress } from '../types';

export const useFFmpeg = () => {
  const [conversionState, setConversionState] = useState<ConversionProgress>({
    progress: 0,
    isConverting: false
  });
  
  const convertVideo = useCallback(async (
    file: File,
    settings: ConversionSettings
  ) => {
    try {
      console.log('Starting conversion with settings:', settings);
      console.log('File info:', { name: file.name, size: file.size, type: file.type });
      
      setConversionState({
        progress: 0,
        isConverting: true,
        error: undefined
      });
      
      // Simple progress simulation for testing UI
      const steps = [10, 25, 50, 75, 90, 100];
      for (const progress of steps) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setConversionState(prev => ({ ...prev, progress }));
        console.log(`Progress: ${progress}%`);
      }
      
      // Create a simple "converted" file for testing UI
      const blob = new Blob([file], { type: `video/${settings.outputFormat}` });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${settings.outputFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setConversionState({ progress: 100, isConverting: false });
      console.log('Conversion completed successfully');
      
    } catch (error) {
      console.error('Conversion error:', error);
      setConversionState({
        progress: 0,
        isConverting: false,
        error: error instanceof Error ? error.message : 'Conversion failed'
      });
    }
  }, []);
  
  const cleanup = useCallback(() => {
    // Nothing to cleanup in this simple version
  }, []);

  return {
    conversionState,
    convertVideo,
    cleanup
  };
};