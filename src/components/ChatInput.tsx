import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { useSpeechToText } from '../hooks/useSpeechToText';
import clsx from 'clsx';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { 
    isListening, 
    startListening, 
    stopListening, 
    transcript,
    isSupported 
  } = useSpeechToText();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (isListening) {
        stopListening();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceButton = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message or use voice input..."
          disabled={disabled}
          rows={1}
          className={clsx(
            "w-full resize-none rounded-2xl px-4 py-3",
            "bg-gray-100 dark:bg-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            "disabled:opacity-50 pr-12",
            "text-sm md:text-base",
            "text-gray-900 dark:text-white",
            "placeholder-gray-500 dark:placeholder-gray-400"
          )}
        />
      </div>
      {isSupported && (
        <button
          type="button"
          onClick={handleVoiceButton}
          className={clsx(
            'p-3 rounded-full transition-colors',
            isListening 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          )}
        >
          <Mic className="w-5 h-5" />
        </button>
      )}
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className={clsx(
          "w-12 h-12 rounded-full",
          "bg-blue-600 dark:bg-blue-500",
          "flex items-center justify-center",
          "text-white",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-blue-700 dark:hover:bg-blue-600",
          "transition-colors shadow-lg"
        )}
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}