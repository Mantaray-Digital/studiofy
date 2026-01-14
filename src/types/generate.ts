export type ViewState = 'upload' | 'workspace';

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: UploadedFile[];
}
