import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

 // Define API
 apiURL = environment.apiUrl+"/api/image";

  // Http Options
httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

  constructor(private http: HttpClient, private toastr: ToastrService) { }

   // Returns an observable
   uploadCreate(image_file:File,employee_id:number):Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("image_file", image_file,image_file.name);
    formData.append("employee_id", String(employee_id));
    // Make http post request over api
    // with formData as req
    return this.http.post(this.apiURL,formData).pipe(
      tap((data) => {
        // Do your success stuff in here
        this.toastr.success("Success", "image created", { timeOut: 2000 });
      })
      // retry(1),
      // catchError(this.handleError)
    );
}


   // Returns an observable
   uploadEdit(image_file:File,employee_id:number):Observable<any> {

    // Create form data
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append("image_file", image_file,image_file.name);
    // Make http post request over api
    // with formData as req
    return this.http.put(this.apiURL+'/'+ employee_id + '/',formData).pipe(
      tap((data) => {
        // Do your success stuff in here
        this.toastr.success("Success", "image edited", { timeOut: 2000 });
      })
      // retry(1),
      // catchError(this.handleError)
    );
}


    // Returns an observable
    uploadGetAll():Observable<any> {
      return this.http.get(this.apiURL,this.httpOptions).pipe(
        tap((data) => {
          // Do your success stuff in here
          this.toastr.success("Success", "images arrived", { timeOut: 2000 });
        })
        // retry(1),
        // catchError(this.handleError)
      );
  }


     // Returns an observable
   uploadGetOne(id: number):Observable<any> {
    return this.http.get(this.apiURL+'/'+ id + '/',this.httpOptions).pipe(
      tap((data) => {
        // Do your success stuff in here
        this.toastr.success("Success", "images arrived", { timeOut: 2000 });
      })
      // retry(1),
      // catchError(this.handleError)
    );
}



}
