// Project Types (Projects domain)

export interface ProjectListing {
  title: string;
  description: string;
  keywords: string[];
}

export interface ProjectOutputs {
  images: string[];
  caption: string;
  listing?: ProjectListing;
}

export interface ProjectMeta {
  productContext: string;
  styleProfile: string;
  quantity: number;
  includeCaption?: string;
  includeListing?: string;
}

export interface Project {
  _id: string;
  name: string;
  thumbnail_url: string;
  outputs?: ProjectOutputs;
  meta?: ProjectMeta;
  createdAt: string;
}

export interface ProjectsResponse {
  data: Project[];
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
}


