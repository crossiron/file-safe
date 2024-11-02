import {Notification} from '../../models/notification.model';

export interface SafeFile {
  readonly id: string;
  readonly filename: string;
  readonly extension: string;
  readonly mimetype: string;
  readonly size: number;
  readonly created: Date;
  readonly updated: Date;
  readonly accessed: Date;
}

export interface FilesResponse {
  readonly files: SafeFile[];
}

export interface FileUploadResponse {
  readonly file: SafeFile;
}

export interface ResolvedSafeModel {
  readonly files: SafeFile[];
  readonly filesError?: Notification<'danger'>;
}
