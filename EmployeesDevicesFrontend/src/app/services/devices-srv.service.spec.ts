import { TestBed } from '@angular/core/testing';

import { DevicesSrvService } from './devices-srv.service';

describe('DevicesSrvService', () => {
  let service: DevicesSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicesSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
