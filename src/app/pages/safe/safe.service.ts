import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FilesResponse, FileUploadResponse} from './safe.models';

@Injectable({
  providedIn: 'root'
})
export class SafeService {
  #httpClient = inject(HttpClient);

  getFiles(): Promise<FilesResponse> {
    return firstValueFrom(this.#httpClient.get<FilesResponse>(environment.endpoints.files));
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.#httpClient.post<HttpEvent<FileUploadResponse>>(environment.endpoints.files, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
