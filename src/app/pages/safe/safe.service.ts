import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FilesResponse} from './safe.model';

@Injectable({
  providedIn: 'root'
})
export class SafeService {
  #httpClient = inject(HttpClient);

  files(): Promise<FilesResponse> {
    return firstValueFrom(this.#httpClient.get<FilesResponse>(environment.endpoints.files.collection));
  }
}
