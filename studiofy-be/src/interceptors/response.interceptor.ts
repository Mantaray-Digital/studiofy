import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: {
    code: string;
    details: string | Record<string, any>;
  } | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const customMessage = this.reflector.get<string>('responseMessage', context.getHandler());

    return next.handle().pipe(
      map((data) => {
        // If the response is already formatted, return it as-is
        if (data && typeof data === 'object' && 'success' in data && 'message' in data && 'data' in data) {
          return data;
        }

        // Otherwise, format the response
        return {
          success: true,
          message: customMessage || 'Request successful',
          data: data || null,
          error: null,
        };
      }),
    );
  }
}
