import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { Employee } from "../interfaces/employee.interface";
import { ToastrService } from "ngx-toastr";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesSrvService {
  // Define API
  apiURL = `${environment.domain + '/api/employees'}`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL)
      .pipe
      // retry(1),
      // catchError(this.handleError)
      ();
  }

  // HttpClient API post() method => Create employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.apiURL, employee, this.httpOptions)
      .pipe(
        tap((data) => {
          // Do your success stuff in here
          this.toastr.success('Success', 'employee created', { timeOut: 2000 });
        })
        // retry(1),
        // catchError(this.handleError)
      );
  }

  // HttpClient API put() method => Update employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(this.apiURL + '/' + id + '/', employee, this.httpOptions)
      .pipe(
        tap((data) => {
          // Do your success stuff in here
          this.toastr.success('Success', 'employee updated', { timeOut: 2000 });
        })
        // retry(1),
        // catchError(this.handleError)
      );
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id: number) {
    return this.http
      .delete<Employee>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(
        tap((data) => {
          // Do your success stuff in here
          this.toastr.success('Success', 'employee deleted', { timeOut: 2000 });
        })
        // retry(1),
        // catchError(this.handleError)
      );
  }

  // HttpClient API delete() method => Delete employee
  getOneEmployee(id: number): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/' + id, this.httpOptions)
      .pipe
      // retry(1),
      // catchError(this.handleError)
      ();
  }

  // Error handling
  // handleError(error:any) {
  //    let errorMessage = '';

  //    if(error.error instanceof ErrorEvent) {
  //      // Get client-side error
  //      errorMessage = error.error.message;
  //    } else {
  //      // Get server-side error
  //      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //    }
  //   // window.alert(errorMessage);
  //    return throwError(errorMessage,);
  // }
}
