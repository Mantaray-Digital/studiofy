import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import { Storage } from '@google-cloud/storage';

type PrivateFileResponse = { originalname: string; key: string };
type PublicFileResponse = { originalname: string; key: string; url: string };

@Injectable()
export class GcsService {
  private readonly bucketName: string;
  private readonly storage: Storage;
  private readonly projectId: string;

  constructor(private readonly config: ConfigService) {
    this.bucketName = this.config.getOrThrow('bucketName');
    this.projectId = this.config.getOrThrow('projectId');

    const encodedGcsKeyJson = this.config.getOrThrow('GCLOUD_KEY_JSON');
    if (!encodedGcsKeyJson) {
      throw new Error('GCLOUD_KEY_JSON environment variable is required but was not provided');
    }
    const decodedGcsKeyJson = Buffer.from(encodedGcsKeyJson, 'base64').toString('utf-8');
    const gcsKey = JSON.parse(decodedGcsKeyJson);

    this.storage = new Storage({
      projectId: this.projectId,
      credentials: gcsKey,
    });
  }

  /*** ✅ SINGLE PRIVATE FILE UPLOAD ***/
  async uploadPrivateFile(file: Express.Multer.File): Promise<PrivateFileResponse> {
    return this.processAndUploadFile(file, false) as Promise<PrivateFileResponse>;
  }

  /*** ✅ MULTIPLE PRIVATE FILE UPLOADS ***/
  async uploadMultiplePrivateFiles(files: Express.Multer.File[]): Promise<PrivateFileResponse[]> {
    return Promise.all(files.map((file) => this.processAndUploadFile(file, false) as Promise<PrivateFileResponse>));
  }

  /*** ✅ SINGLE PUBLIC FILE UPLOAD ***/
  async uploadPublicFile(file: Express.Multer.File): Promise<PublicFileResponse> {
    return this.processAndUploadFile(file, true) as Promise<PublicFileResponse>;
  }

  /*** ✅ MULTIPLE PUBLIC FILE UPLOADS ***/
  async uploadMultiplePublicFiles(files: Express.Multer.File[]): Promise<PublicFileResponse[]> {
    return Promise.all(files.map((file) => this.processAndUploadFile(file, true) as Promise<PublicFileResponse>));
  }
  /*** ✅ DELETE A SINGLE FILE ***/
  async deleteFile(fileKey: string): Promise<void> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const fileObject = bucket.file(fileKey);

      await fileObject.delete();
    } catch (error) {
      console.error('Error deleting file from GCS:', error.message || error);
      throw new Error('Failed to delete file from GCS');
    }
  }

  /*** ✅ DELETE MULTIPLE FILES ***/
  async deleteMultipleFiles(fileKeys: string[]): Promise<void> {
    try {
      await Promise.all(fileKeys.map((fileKey) => this.deleteFile(fileKey)));
    } catch (error) {
      console.error('Error deleting multiple files from GCS:', error.message || error);
      throw new Error('Failed to delete multiple files from GCS');
    }
  }

  /*** ✅ PROCESS AND UPLOAD FILE (PRIVATE or PUBLIC) ***/
  private async processAndUploadFile(file: Express.Multer.File, isPublic: boolean) {
    const { originalname, buffer, mimetype } = file;
    const uniqueFileName = this.generateUniqueFileName(originalname);

    try {
      let processedBuffer = buffer;
      if (!mimetype.includes('svg')) {
        processedBuffer = await sharp.default(buffer).resize(800).jpeg({ quality: 80 }).toBuffer();
      }
      const bucket = this.storage.bucket(this.bucketName);
      const fileObject = bucket.file(uniqueFileName);

      await fileObject.save(processedBuffer, {
        metadata: {
          contentType: mimetype,
          cacheControl: isPublic ? 'public, max-age=31536000' : 'private, max-age=0',
        },
        public: isPublic,
      });

      const fileKey = uniqueFileName;
      if (isPublic) {
        const url = `https://storage.googleapis.com/${this.bucketName}/${fileKey}`;
        return { originalname, key: fileKey, url }; // ✅ Public file with URL
      } else {
        return { originalname, key: fileKey }; // ✅ Private file without URL
      }
    } catch (error) {
      console.error('Error uploading file to GCS:', error.message || error);
      throw new Error('Failed to upload file to GCS');
    }
  }

  /*** ✅ GENERATE SIGNED URL ***/
  async generateSignedUrl(fileKey: string): Promise<string> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const fileObject = bucket.file(fileKey);
      const expiresAt = Date.now() + 1000 * 60 * 15;

      const [url] = await fileObject.getSignedUrl({
        action: 'read',
        expires: expiresAt,
        version: 'v4',
      });

      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error.message || error);
      throw new Error('Failed to generate signed URL');
    }
  }
  extractFileKeyFromUrl(url: string): string {
    try {
      const bucketUrl = `https://storage.googleapis.com/${this.bucketName}/`;
      if (!url.startsWith(bucketUrl)) {
        throw new Error('Invalid URL: Does not belong to the configured bucket.');
      }
      return url.replace(bucketUrl, '');
    } catch (error) {
      console.error('Error extracting file key:', error.message || error);
      throw new Error('Failed to extract file key from URL');
    }
  }
  extractTheOriginalNameFromUrl(url: string): string {
    try {
      const bucketUrl = `https://storage.googleapis.com/${this.bucketName}/`;
      if (!url.startsWith(bucketUrl)) {
        throw new Error('Invalid URL: Does not belong to the configured bucket.');
      }
      const fileKey = url.replace(bucketUrl, '');
      // The unique file name is generated as timestamp-originalName
      // We need to split by the first hyphen to get the original name
      const parts = fileKey.split('-');
      if (parts.length < 2) {
        // Handle cases where the file key might not have the expected format
        console.warn(`File key does not contain a hyphen: ${fileKey}`);
        return fileKey; // Return the key as is or handle as an error
      }
      // Join parts after the first hyphen
      return parts.slice(1).join('-');
    } catch (error) {
      console.error('Error extracting original file name:', error.message || error);
      throw new Error('Failed to extract original file name from URL');
    }
  }

  /*** ✅ GENERATE MULTIPLE SIGNED URLS ***/
  async generateMultipleSignedUrls(fileKeys: string[]): Promise<{ key: string; url: string }[]> {
    try {
      const signedUrls = await Promise.all(
        fileKeys.map(async (fileKey) => {
          const url = await this.generateSignedUrl(fileKey);
          return { key: fileKey, url };
        }),
      );

      return signedUrls;
    } catch (error) {
      console.error('Error generating multiple signed URLs:', error.message || error);
      throw new Error('Failed to generate multiple signed URLs');
    }
  }

  /*** ✅ GENERATE UNIQUE FILE NAME ***/
  private generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    const sanitizedFileName = originalName.replace(/\s+/g, '-');
    return `${timestamp}-${sanitizedFileName}`;
  }
}
