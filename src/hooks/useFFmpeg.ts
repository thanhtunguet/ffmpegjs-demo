import { useState, useRef, useCallback } from 'react';
import { ConversionSettings, ConversionProgress } from '../types';

export const useFFmpeg = () => {
  const [conversionState, setConversionState] = useState<ConversionProgress>({
    progress: 0,
    isConverting: false
  });
  
  const workerRef = useRef<Worker | null>(null);
  
  const initWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker('/ffmpeg-worker.js', { type: 'module' });
      
      workerRef.current.onmessage = (e) => {
        const { type, progress, data, error } = e.data;
        
        switch (type) {
          case 'progress':
            setConversionState(prev => ({ ...prev, progress }));
            break;
            
          case 'success':
            setConversionState({ progress: 100, isConverting: false });
            const blob = new Blob([data.outputData]);
            const url = URL.createObjectURL(blob);
            
            // Create download link
            const a = document.createElement('a');
            a.href = url;
            a.download = data.fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            break;
            
          case 'error':
            setConversionState({ 
              progress: 0, 
              isConverting: false, 
              error 
            });
            break;
        }
      };
    }
    return workerRef.current;
  }, []);
  
  const convertVideo = useCallback((
    file: File,
    settings: ConversionSettings
  ) => {
    const worker = initWorker();
    
    setConversionState({
      progress: 0,
      isConverting: true,
      error: undefined
    });
    
    worker.postMessage({
      type: 'convert',
      data: {
        inputFile: file,
        outputFormat: settings.outputFormat,
        videoQuality: settings.videoQuality,
        audioQuality: settings.audioQuality,
        maintainAspectRatio: settings.maintainAspectRatio
      }
    });
  }, [initWorker]);
  
  const cleanup = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);
  
  return {
    conversionState,
    convertVideo,
    cleanup
  };
};