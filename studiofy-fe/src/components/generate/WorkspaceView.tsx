'use client';

import { GenerateHeader } from './GenerateHeader';
import { ImagePreview } from './ImagePreview';
import { ChatPanel } from './ChatPanel';
import { TabNavigation } from './TabNavigation';
import type { ChatMessage, UploadedFile } from '@/types/generate';

interface WorkspaceViewProps {
  uploadedImage: UploadedFile | null;
  generatedImage: string | null;
  messages: ChatMessage[];
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  onSendMessage: (message: string, attachments?: UploadedFile[]) => void;
  isGenerating: boolean;
  onOpenStyleModal?: () => void;
}

export function WorkspaceView({
  uploadedImage,
  generatedImage,
  messages,
  selectedStyle,
  onStyleChange,
  onSendMessage,
  isGenerating,
  onOpenStyleModal,
}: WorkspaceViewProps) {
  // Display generated image if available, otherwise show uploaded image
  const displayImage = generatedImage || uploadedImage?.url || null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <GenerateHeader />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Panel - Image Preview */}
        <div className="flex-1 flex flex-col bg-[#f8f9fa]">
          {/* Tab Navigation */}
          <div className="flex justify-center py-4">
            <TabNavigation />
          </div>

          {/* Image Preview */}
          <ImagePreview imageUrl={displayImage} />
        </div>

        {/* Right Panel - Chat */}
        <ChatPanel
          messages={messages}
          selectedStyle={selectedStyle}
          onStyleChange={onStyleChange}
          onSendMessage={onSendMessage}
          isGenerating={isGenerating}
          onOpenStyleModal={onOpenStyleModal}
        />
      </div>
    </div>
  );
}
