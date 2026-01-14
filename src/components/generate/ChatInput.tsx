'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { X, FileText, Sparkles } from 'lucide-react';
import type { UploadedFile } from '@/types/generate';

interface ChatInputProps {
  onSend: (message: string, attachments?: UploadedFile[]) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<UploadedFile[]>([]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: UploadedFile[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = '';
  }, []);

  const handleRemoveAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const removed = prev.find((a) => a.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.url);
      }
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!message.trim() && attachments.length === 0) return;
    if (disabled) return;

    onSend(message, attachments.length > 0 ? attachments : undefined);
    setMessage('');
    setAttachments([]);
  }, [message, attachments, onSend, disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
    return `${Math.round(bytes / (1024 * 1024))}MB`;
  };

  return (
    <div className="space-y-2">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="p-3 flex flex-wrap gap-2 border-b border-gray-100">
            {attachments.map((file) => (
              <div key={file.id} className="relative group">
                {file.type.startsWith('image/') ? (
                  <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden">
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                      sizes="60px"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(file.id)}
                      className="absolute top-1 right-1 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg pr-8">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {file.type.split('/')[1]?.toUpperCase()} {formatFileSize(file.size)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(file.id)}
                      className="absolute top-1 right-1 p-1 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove file"
                    >
                      <X className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Text Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your prompt here.."
          disabled={disabled}
          rows={3}
          className="w-full px-4 py-3 resize-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
        />

        {/* Actions */}
        <div className="flex items-center justify-between px-3 pb-3">
          {/* Attachment Button */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
            />
            <span className="inline-flex items-center justify-center w-9 h-9 hover:bg-gray-100 rounded-full transition-colors">
              <Image
                src="/images/generate-icon.svg"
                alt="Attach"
                width={13}
                height={17}
                className="opacity-70"
              />
            </span>
          </label>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || (!message.trim() && attachments.length === 0)}
            className="flex items-center justify-center gap-2 px-8 py-2.5 bg-linear-to-r w-full from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate</span>
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-gray-400">
        AI can make mistakes, so double-check its responses
      </p>
    </div>
  );
}
