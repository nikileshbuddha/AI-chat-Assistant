import React from 'react';
import { User, Bot } from 'lucide-react';
import clsx from 'clsx';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ text, isUser, timestamp }: ChatMessageProps) {
  return (
    <div
      className={clsx(
        'flex w-full gap-3 animate-slide-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}
      <div className="flex flex-col max-w-[80%] lg:max-w-[70%]">
        <div
          className={clsx(
            'rounded-2xl p-4 shadow-lg',
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
              : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white rounded-bl-none'
          )}
        >
          <p className="text-sm md:text-base whitespace-pre-wrap">{text}</p>
        </div>
        <span
          className={clsx(
            'text-xs mt-1',
            isUser ? 'text-right' : 'text-left',
            'text-gray-600 dark:text-gray-400'
          )}
        >
          {timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
          <User className="w-6 h-6 text-white" />
        </div>
      )}
    </div>
  );
}