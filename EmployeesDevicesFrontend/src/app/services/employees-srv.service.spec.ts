import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { Employee } from '../interfaces/employee.interface';

import { EmployeesSrvService } from './employees-srv.service';

describe('EmployeesSrvService', () => {
  let service: EmployeesSrvService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [
        HttpClientTestingModule,ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
      ],
      providers: [
        EmployeesSrvService
      ]});
    service = TestBed.inject(EmployeesSrvService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it(`should fetch employees as an Observable`, (done) => {
    waitForAsync(inject([HttpTestingController, EmployeesSrvService],
      (httpClient: HttpTestingController, empSrv: EmployeesSrvService) => {
        empSrv.getEmployees()
          .subscribe((value: Employee) => {
            expect(value).toContain(value);
          });
          const req =httpMock.expectOne({
	      method: 'GET',
	      url: `${service.apiURL}`,
	    });

			//4
	   req.flush(null);
      done();


      }))
  },20000);


// it('should call getEmployees and return an array of employees', (done) => {
//       let EmployeesArray:Employee
// 			// 1
// 		  service.getEmployees().subscribe((res) => {
// 				//2
// 	      expect(res).toEqual(EmployeesArray);
//         	//3
// 	    const req =httpMock.expectOne({
// 	      method: 'GET',
// 	      url: `${service.apiURL}`,
// 	    });

// 			//4
// 	   req.flush(EmployeesArray);
//       done();

// 	    });
// 	  },10000);




afterEach(() => {
    httpMock.verify();
  });
});
