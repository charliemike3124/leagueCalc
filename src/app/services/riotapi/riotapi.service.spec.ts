import { TestBed } from '@angular/core/testing';

import { RiotapiService } from './riotapi.service';

describe('RiotapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiotapiService = TestBed.get(RiotapiService);
    expect(service).toBeTruthy();
  });
});
