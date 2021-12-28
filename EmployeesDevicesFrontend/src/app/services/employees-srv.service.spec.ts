import { TestBed } from '@angular/core/testing';

import { EmployeesSrvService } from './employees-srv.service';

describe('EmployeesSrvService', () => {
  let service: EmployeesSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
