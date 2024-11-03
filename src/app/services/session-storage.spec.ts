import {TestBed} from '@angular/core/testing';
import {SessionStorageService} from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    let mockedStorage: Record<string, string> = {};
    spyOn(window.sessionStorage, 'getItem').and.callFake((key) => mockedStorage[key] || null);
    spyOn(window.sessionStorage, 'setItem').and.callFake((key, value) => mockedStorage[key] = String(value));

    TestBed.configureTestingModule({
      providers: [SessionStorageService]
    });

    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('lastActivity', () => {
    it('should return default value when none has been set before', () => {
      expect(service.lastActivity()).toEqual(SessionStorageService.LAST_ACTIVITY_INITIAL);
    });

    it('should update the value, and the value is reflected in the signal', () => {
      service.lastActivity.set(1000);
      expect(service.lastActivity()).toEqual(1000);
    });
  })
});
