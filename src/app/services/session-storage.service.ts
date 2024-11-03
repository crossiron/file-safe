import {effect, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  static readonly LAST_ACTIVITY_KEY = 'last-activity';
  static readonly LAST_ACTIVITY_INITIAL = -1;
  static readonly STORAGE: Storage = window.sessionStorage;

  lastActivity = signal(this.#get(SessionStorageService.LAST_ACTIVITY_KEY, SessionStorageService.LAST_ACTIVITY_INITIAL));

  constructor() {
    effect(() => this.#syncWithStorage(this.lastActivity(), SessionStorageService.LAST_ACTIVITY_INITIAL, SessionStorageService.LAST_ACTIVITY_KEY));
  }

  #get<T>(key: string, fallback: T): T {
    const item = SessionStorageService.STORAGE.getItem(key);
    if (item === null) {
      return fallback;
    }
    return JSON.parse(item);
  }

  #set<T>(key: string, value: T): void {
    SessionStorageService.STORAGE.setItem(key, JSON.stringify(value));
  }

  #syncWithStorage(signalValue: unknown, initialValue: unknown, key: string) {
    if (signalValue != initialValue) {
      this.#set(key, signalValue);
    }
  }
}
