import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { Device } from "../interfaces/device";
import { ToastrService } from "ngx-toastr";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevicesSrvService {
  // Define API
  apiURL = `${environment.domain + '/api/devices'}`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch Devices list
  getDevices(): Observable<Device> {
    return this.http
      .get<Device>(this.apiURL)
      .pipe
      // retry(1),
      // catchError(this.handleError)
      ();
  }

  // HttpClient API post() method => Create Device
  createDevice(device: Device): Observable<Device> {
    return this.http
      .post<Device>(this.apiURL, JSON.stringify(device), this.httpOptions)
      .pipe(
        tap((data) => {
          // Do your success stuff in here
          this.toastr.success('Success', 'device created', { timeOut: 2000 });
        })
        // retry(1),
        // catchError(this.handleError)
      );
  }

  // HttpClient API put() method => Update Device
  updateDevice(id: number, device: Device): Observable<Device> {
    return this.http
      .put<Device>(
        this.apiURL + '/' + id + '/',
        JSON.stringify(device),
        this.httpOptions
      )
      .pipe(
        tap((data) => {
          // Do your success stuff in here
          this.toastr.success('Success', 'device updated', { timeOut: 2000 });
        })
        // retry(1),
        // catchError(this.handleError)
      );
  }

  // HttpClient API delete() method => Delete Device
  deleteDevice(id: number) {
    return this.http
      .delete<Device>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(
        tap((data) => {
          // Do your success stuff in here
          this.toastr.success('Success', 'device deleted', { timeOut: 2000 });
        })
        //retry(1),
        // catchError(this.handleError)
      );
  }

  // HttpClient API delete() method => Delete Device
  getOneDevice(id: number): Observable<Device> {
    return this.http
      .get<Device>(this.apiURL + '/' + id, this.httpOptions)
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
  //    return throwError(errorMessage);
  // }
}
