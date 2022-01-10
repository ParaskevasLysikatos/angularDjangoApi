import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { DevicesSrvService } from './devices-srv.service';

describe('DevicesSrvService', () => {
  let service: DevicesSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [
        HttpClientTestingModule,ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
      ],
      providers: [
        DevicesSrvService
      ],});
    service = TestBed.inject(DevicesSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
