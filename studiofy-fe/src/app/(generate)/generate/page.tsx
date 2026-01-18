'use client';

import { useState } from 'react';
import { UploadView } from '@/components/generate/UploadView';
import { WorkspaceView } from '@/components/generate/WorkspaceView';
import { GeneratingOverlay } from '@/components/generate/GeneratingOverlay';
import { StyleSelectorModal } from '@/components/generate/StyleSelectorModal';
import { useGenerate } from '@/hooks/generate/useGenerate';
import type { ViewState, UploadedFile, ChatMessage } from '@/types/generate';

export default function GeneratePage() {
  const [viewState, setViewState] = useState<ViewState>('upload');
  const [uploadedImage, setUploadedImage] = useState<UploadedFile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [showStyleModal, setShowStyleModal] = useState(false);

  const { generateAsync, isPending: isGenerating } = useGenerate();

  const handleUpload = (file: UploadedFile) => {
    setUploadedImage(file);
    setViewState('workspace');
  };

  const handleSendMessage = async (content: string, attachments?: UploadedFile[]) => {
    // Don't proceed if no uploaded image with file
    if (!uploadedImage?.file) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      attachments,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const result = await generateAsync({
        prompt: content,
        styleId: selectedStyle || undefined,
        quantity: 1,
        image: uploadedImage.file,
      });

      if (result?.data) {
        const images = result.data.outputs?.images || [];
        setGeneratedImages(images);

        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I've generated ${images.length} image${images.length > 1 ? 's' : ''} based on your prompt "${content}".`,
          timestamp: new Date(),
          generatedImages: images,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error generating your images. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  // Use the first generated image as the display image
  const generatedImage = generatedImages[0] || null;

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
