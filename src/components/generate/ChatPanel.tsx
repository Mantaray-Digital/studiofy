'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, History } from 'lucide-react';
import { StyleSelector } from './StyleSelector';
import { ChatInput } from './ChatInput';
import { ChatMessage, WelcomeMessage } from './ChatMessage';
import { PromptSuggestionsList } from './PromptSuggestion';
import { HistorySidebar } from './HistorySidebar';
import type { ChatMessage as ChatMessageType, UploadedFile } from '@/types/generate';

interface ChatPanelProps {
  messages: ChatMessageType[];
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  onSendMessage: (message: string, attachments?: UploadedFile[]) => void;
  isGenerating: boolean;
  onOpenStyleModal?: () => void;
}

const defaultSuggestions = [
  'Create a realistic image of a beauty product',
  'Make It looks professional',
];

const historyItems = [
  'Generate AI realistic product photos',
  'Generate AI realistic product photos',
];

export function ChatPanel({
  messages,
  selectedStyle,
  onStyleChange,
  onSendMessage,
  isGenerating,
  onOpenStyleModal,
}: ChatPanelProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const hasConversation = messages.length > 0;

  const handleSuggestionSelect = (text: string) => {
    onSendMessage(text);
  };

  return (
    <>
      <div className="w-full lg:w-[425px] h-[calc(100vh-30px)] flex flex-col relative overflow-hidden" style={{ backgroundColor: '#E8EBFF' }}>
        {/* Background Decorations */}
        <div className="absolute top-16 right-0 w-80 h-80 bg-linear-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-60 h-60 bg-linear-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-4 px-5 py-3.5">
          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Open history"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="flex-1 text-center text-sm font-medium text-gray-800">New chat</h2>
          <div className="w-9" /> {/* Spacer for balance */}
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-4 pb-2">
          {!hasConversation ? (
            <>
              {/* Welcome State */}
              <div className="flex flex-col items-center pt-4 mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                  Welcome back <span role="img" aria-label="wave">👋</span>
                </h1>
                <p className="text-sm text-gray-500">How can I help you today?</p>
              </div>

              {/* Logo Animation */}
              <div className="flex justify-center mb-8">
                <div className="relative w-[142px] h-[142px]">
                  {/* Gradient Ellipse 1 - Rotated cyan/blue/purple */}
                  <div
                    className="absolute w-[90px] h-[132px] left-[22px] top-[5px] animate-[spin_8s_linear_infinite]"
                    style={{
                      background: 'linear-gradient(135deg, #00D4FF 0%, #7B61FF 50%, #FF61D8 100%)',
                      borderRadius: '50%',
                      filter: 'blur(8px)',
                      opacity: 0.6,
                      transform: 'rotate(16deg)',
                    }}
                  />
                  {/* Gradient Ellipse 2 - Rotated green/yellow/pink */}
                  <div
                    className="absolute w-[142px] h-[96px] left-0 top-[25px] animate-[spin_10s_linear_infinite_reverse]"
                    style={{
                      background: 'linear-gradient(135deg, #61FF7B 0%, #FFE561 50%, #FF6161 100%)',
                      borderRadius: '50%',
                      filter: 'blur(8px)',
                      opacity: 0.5,
                      transform: 'rotate(73deg)',
                    }}
                  />
                  {/* Center Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/LogoAnimation.svg"
                      alt="Studiofy"
                      width={90}
                      height={90}
                      className="w-[90px] h-[90px] animate-[pulse_3s_ease-in-out_infinite]"
                    />
                  </div>
                </div>
              </div>

            </>
          ) : (
            <>
              {/* Conversation View */}
              <WelcomeMessage className="mb-4" />

              {/* Prompt Suggestions */}
              {messages.length === 0 && (
                <div className="ml-12 mb-4">
                  <PromptSuggestionsList
                    suggestions={defaultSuggestions}
                    onSelect={handleSuggestionSelect}
                  />
                </div>
              )}

              {/* Messages */}
              <div className="space-y-2">
                {messages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    isTyping={
                      isGenerating &&
                      index === messages.length - 1 &&
                      msg.role === 'assistant'
                    }
                  />
                ))}

                {/* Typing Indicator */}
                {isGenerating && messages[messages.length - 1]?.role === 'user' && (
                  <ChatMessage
                    message={{
                      id: 'typing',
                      role: 'assistant',
                      content: '',
                      timestamp: new Date(),
                    }}
                    isTyping
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* Style Selector & History - Fixed above chat input */}
        {!hasConversation && (
          <div className="relative z-10 shrink-0 px-4">
            {/* Style Selector */}
            <div className="mb-3">
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleChange={onStyleChange}
                onOpenModal={onOpenStyleModal}
              />
            </div>

            {/* History Suggestions */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {historyItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionSelect(item)}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white/50 rounded-lg hover:bg-white/70 transition-all"
                >
                  <History className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 whitespace-nowrap">{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input - Fixed at bottom */}
        <div className="relative z-10 shrink-0 px-4 pb-4 pt-2">
          <ChatInput onSend={onSendMessage} disabled={isGenerating} />
        </div>
      </div>

      {/* History Sidebar */}
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
}
