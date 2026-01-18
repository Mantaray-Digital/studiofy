export type ViewState = 'upload' | 'workspace';

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  file?: File; // Original file object for upload
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: UploadedFile[];
  isGenerating?: boolean;
  generatedImages?: string[];
}

// Generation API types
export interface GenerateInput {
  prompt: string;
  styleId?: string;
  quantity?: number;
  image: File;
}

export interface GeneratedProjectOutputs {
  images: string[];
  caption: string;
}

export interface GeneratedProjectMeta {
  productContext: string;
  styleProfile: string;
  quantity: number;
}

export interface GeneratedProjectMetadata {
  tokensIn: number;
  tokensOut: number;
  imageCount: number;
  googleCostUsd: number;
  userPriceUsd: number;
  profitUsd: number;
  margin: number;
}

export interface GeneratedProject {
  _id: string;
  user: string;
  name: string;
  thumbnailUrl: string;
  outputs: GeneratedProjectOutputs;
  meta: GeneratedProjectMeta;
  metadata: GeneratedProjectMetadata;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
