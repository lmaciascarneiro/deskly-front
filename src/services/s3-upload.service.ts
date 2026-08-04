import axios from 'axios';
import { api } from '@/api/api';
import {
  UploadUrlRequestDto,
  UploadUrlResponseDto,
  UploadUrlResult,
  mapUploadUrlResult,
} from '@/types/workspace-photo';

// Plain axios instance (no auth interceptor) — the presigned URL already
// carries its own auth, and the backend's Bearer token must never be sent to S3.
const s3Client = axios.create();

export interface UploadToS3Options {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}

export const s3UploadService = {
  async requestUploadUrl(
    workspaceId: string,
    contentType: string
  ): Promise<UploadUrlResult> {
    const body: UploadUrlRequestDto = { content_type: contentType };
    const response = await api.post<UploadUrlResponseDto>(
      `/api/v1/host/workspaces/${workspaceId}/photos/upload-url`,
      body
    );
    return mapUploadUrlResult(response.data);
  },

  async uploadFile(
    uploadUrl: string,
    file: File,
    options: UploadToS3Options = {}
  ): Promise<void> {
    await s3Client.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type },
      signal: options.signal,
      onUploadProgress: (event) => {
        if (!options.onProgress || !event.total) return;
        options.onProgress(Math.round((event.loaded / event.total) * 100));
      },
    });
  },

  async uploadPhoto(
    workspaceId: string,
    file: File,
    options: UploadToS3Options = {}
  ): Promise<string> {
    const { uploadUrl, objectKey, maxFileSizeBytes } =
      await this.requestUploadUrl(workspaceId, file.type);
    if (file.size > maxFileSizeBytes) {
      const maxMb = (maxFileSizeBytes / (1024 * 1024)).toFixed(1);
      throw new Error(`Image is too large. Maximum size is ${maxMb} MB.`);
    }
    await this.uploadFile(uploadUrl, file, options);
    return objectKey;
  },
};
