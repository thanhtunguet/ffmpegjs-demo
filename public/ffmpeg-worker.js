import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpeg = null;

const initFFmpeg = async () => {
  if (ffmpeg) return ffmpeg;
  
  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  
  // Load FFmpeg
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  
  return ffmpeg;
};

const getQualityParams = (videoQuality, audioQuality) => {
  const videoParams = {
    'Low': ['-crf', '28', '-preset', 'fast'],
    'Medium': ['-crf', '23', '-preset', 'medium'],
    'High': ['-crf', '18', '-preset', 'slow'],
    'Lossless': ['-crf', '0', '-preset', 'veryslow']
  };

  const audioParams = {
    'Low': ['-b:a', '64k'],
    'Medium': ['-b:a', '128k'],
    'High': ['-b:a', '192k'],
    'Lossless': ['-c:a', 'flac']
  };

  return {
    video: videoParams[videoQuality] || videoParams['Medium'],
    audio: audioParams[audioQuality] || audioParams['Medium']
  };
};

self.onmessage = async (e) => {
  const { type, data } = e.data;

  try {
    if (type === 'convert') {
      const { 
        inputFile, 
        outputFormat, 
        videoQuality = 'Medium', 
        audioQuality = 'Medium',
        maintainAspectRatio = true 
      } = data;

      // Initialize FFmpeg
      const ffmpegInstance = await initFFmpeg();
      
      // Write input file
      const inputFileName = 'input' + '.' + inputFile.name.split('.').pop();
      const outputFileName = 'output.' + outputFormat;
      
      await ffmpegInstance.writeFile(inputFileName, new Uint8Array(await inputFile.arrayBuffer()));

      // Get quality parameters
      const qualityParams = getQualityParams(videoQuality, audioQuality);
      
      // Build FFmpeg command
      let command = ['-i', inputFileName];
      
      // Add video quality parameters
      command = command.concat(qualityParams.video);
      
      // Add audio quality parameters
      command = command.concat(qualityParams.audio);
      
      // Maintain aspect ratio
      if (maintainAspectRatio) {
        command = command.concat(['-aspect', '16:9', '-vf', 'scale=-2:720']);
      }
      
      // Add output file
      command.push(outputFileName);
      
      // Set up progress callback
      ffmpegInstance.on('progress', ({ progress }) => {
        self.postMessage({
          type: 'progress',
          progress: Math.round(progress * 100)
        });
      });
      
      // Execute conversion
      await ffmpegInstance.exec(command);
      
      // Read output file
      const outputData = await ffmpegInstance.readFile(outputFileName);
      
      // Send result back
      self.postMessage({
        type: 'success',
        data: {
          outputData: outputData.buffer,
          fileName: outputFileName
        }
      });
      
      // Clean up
      await ffmpegInstance.deleteFile(inputFileName);
      await ffmpegInstance.deleteFile(outputFileName);
      
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error.message
    });
  }
};