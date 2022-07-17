import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmployeesDevicesFrontend';
  spinnerStyle = Spinkit;
}
