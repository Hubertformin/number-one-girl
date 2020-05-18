import { TestBed } from '@angular/core/testing';

import { SettingsResolverService } from './settings-resolver.service';

describe('HomeResolverService', () => {
  let service: SettingsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
