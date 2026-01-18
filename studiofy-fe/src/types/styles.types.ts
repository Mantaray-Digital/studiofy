export interface Style {
  _id: string;
  name: string;
  promptTemplate: string;
  thumbnailUrl: string;
  isPremium: boolean;
  isActive?: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
