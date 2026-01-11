export type Response<T> = {
  success?: boolean;
  data: T;
  message?: string;
  error?: {
    details: string;
    code?: string;
  } | null;
};

