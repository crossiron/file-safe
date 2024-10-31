import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FilesResponse} from './safe.model';

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

    const req = new HttpRequest('POST', environment.endpoints.files, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.#httpClient.request(req);
  }
}
