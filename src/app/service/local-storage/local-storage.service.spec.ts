import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set method', () => {
    it('should set localstorage', () => {
      service.set('token', 'vtoken');
      expect(localStorage.getItem('token')).toEqual('vtoken');
    });
  });

  describe('get method', () => {
    it('should get localstorage', () => {
      localStorage.setItem('token', 'vtoken');
      expect(service.get('token')).toEqual('vtoken');
    });
  });

  describe('remove method', () => {
    it('should get localstorage', () => {
      service.remove('token');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
