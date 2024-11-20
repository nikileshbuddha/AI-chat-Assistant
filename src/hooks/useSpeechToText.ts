import { useState, useEffect, useCallback } from 'react';

export function useSpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const finalTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ');
        setTranscript(finalTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
      setIsSupported(true);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  }, [recognition]);

  return {
    isListening,
    startListening,
    stopListening,
    transcript,
    isSupported
  };
}