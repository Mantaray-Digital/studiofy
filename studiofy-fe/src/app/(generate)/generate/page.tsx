'use client';

import { useState } from 'react';
import { UploadView } from '@/components/generate/UploadView';
import { WorkspaceView } from '@/components/generate/WorkspaceView';
import { GeneratingOverlay } from '@/components/generate/GeneratingOverlay';
import { StyleSelectorModal } from '@/components/generate/StyleSelectorModal';
import type { ViewState, UploadedFile, ChatMessage } from '@/types/generate';

export default function GeneratePage() {
  const [viewState, setViewState] = useState<ViewState>('upload');
  const [uploadedImage, setUploadedImage] = useState<UploadedFile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showStyleModal, setShowStyleModal] = useState(false);

  const handleUpload = (file: UploadedFile) => {
    setUploadedImage(file);
    setViewState('workspace');
  };

  const handleSendMessage = (content: string, attachments?: UploadedFile[]) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      attachments,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I've generated the customized image of a beauty product based on your prompt.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setGeneratedImage('/images/products/professional.jpg');
      setIsGenerating(false);
    }, 3000);
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  return (
    <>
      {viewState === 'upload' && <UploadView onUpload={handleUpload} />}
      {viewState === 'workspace' && (
        <WorkspaceView
          uploadedImage={uploadedImage}
          generatedImage={generatedImage}
          messages={messages}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          onOpenStyleModal={() => setShowStyleModal(true)}
        />
      )}
      {/* Only show overlay during upload phase, not during chat */}
      {isGenerating && viewState === 'upload' && <GeneratingOverlay />}

      {/* Style Selector Modal */}
      <StyleSelectorModal
        isOpen={showStyleModal}
        onClose={() => setShowStyleModal(false)}
        onSelectStyle={handleStyleSelect}
        selectedStyle={selectedStyle}
      />
    </>
  );
}
