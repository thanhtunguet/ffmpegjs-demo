import React from 'react';

interface ProgressBarProps {
  progress: number;
  isConverting: boolean;
  error?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  isConverting, 
  error 
}) => {
  if (error) {
    return (
      <div className="progress-container">
        <div className="error-message">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!isConverting && progress === 0) {
    return null;
  }

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>
          {isConverting ? 'Converting...' : 'Complete!'} {progress}%
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};