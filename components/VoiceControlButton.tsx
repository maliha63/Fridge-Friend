import React from 'react';
import MicrophoneIcon from './icons/MicrophoneIcon';
import type { RecognitionError } from '../hooks/useVoiceCommands';

interface VoiceControlButtonProps {
    isListening: boolean;
    onStart: () => void;
    onStop: () => void;
    error: RecognitionError;
}

const getErrorMessage = (error: RecognitionError): string => {
    if (!error) return '';
    switch (error) {
        case 'no-speech':
            return "Didn't catch that. Please try again.";
        case 'not-allowed':
        case 'service-not-allowed':
            return "Microphone access denied.";
        default:
            return "Voice command failed.";
    }
}

const VoiceControlButton: React.FC<VoiceControlButtonProps> = ({ isListening, onStart, onStop, error }) => {
    const hasError = !!error;
    const errorMessage = getErrorMessage(error);

    const buttonClasses = [
        'w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300',
        isListening ? 'bg-red-500 animate-pulse' : 'bg-cyan-500 hover:bg-cyan-600',
        hasError ? 'bg-yellow-600 animate-shake' : ''
    ].join(' ');

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {hasError && (
                <div className="absolute bottom-full right-0 mb-2 w-max max-w-xs bg-gray-700 text-white text-sm rounded-lg px-3 py-2 shadow-lg animate-fade-in" role="alert">
                    {errorMessage}
                </div>
            )}
            <button
                onClick={isListening ? onStop : onStart}
                className={buttonClasses}
                aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
                <MicrophoneIcon className="w-8 h-8 text-white" />
            </button>
        </div>
    );
};

export default VoiceControlButton;