export interface File {
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
  readonly files: File[];
}

export interface ListModel {
  files: File[];
  error?: Error
}

export interface SafeModel {
  list: ListModel
}
