'use client';

import Image from 'next/image';
import { Hand, Sparkles } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/types/generate';

interface ChatMessageProps {
  message: ChatMessageType;
  isTyping?: boolean;
}

export function ChatMessage({ message, isTyping = false }: ChatMessageProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[280px] bg-gray-700 text-white px-4 py-3 rounded-2xl rounded-br-sm">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-4 items-end">
      {/* AI Avatar */}
      <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
        <Image
          src="/images/logo.svg"
          alt="Studiofy AI"
          width={24}
          height={24}
          className="w-9 h-9"
        />
      </div>

      {/* Message Content */}
      <div className="flex-1 max-w-[300px]">
        {isTyping ? (
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
            {/* Badge for responses */}
            {message.content.includes('generated') && (
              <div className="flex items-center gap-1 mb-2">
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-medium text-blue-500">Based on your prompt</span>
              </div>
            )}
            <p className="text-sm text-gray-700">{message.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface WelcomeMessageProps {
  className?: string;
}

export function WelcomeMessage({ className = '' }: WelcomeMessageProps) {
  return (
    <div className={`flex gap-3 items-end ${className}`}>
      {/* AI Avatar */}
      <div className="shrink-0 w-9 h-9 rounded-full  flex items-center justify-center">
        <Image
          src="/images/logo.svg"
          alt="Studiofy AI"
          width={24}
          height={24}
          className="w-9 h-9"
        />
      </div>

      {/* Message Content */}
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[300px]">
        <div className="flex items-start gap-2">
          <Hand className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">
            Hi! I&apos;m Studify Assistant, here to help you with what you need.
          </p>
        </div>
      </div>
    </div>
  );
}
