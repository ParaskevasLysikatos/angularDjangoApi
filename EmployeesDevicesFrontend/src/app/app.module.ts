import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DevicesViewComponent } from './components/device/devices-view/devices-view.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EmployeesViewComponent } from './components/employee/employees-view/employees-view.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { EditDeviceComponent } from './components/device/edit-device/edit-device.component';
import { CreateDeviceComponent } from './components/device/create-device/create-device.component';







@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    EmployeesViewComponent,
    DevicesViewComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    EditDeviceComponent,
    CreateDeviceComponent,

  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    MatSidenavModule,MatListModule,MatIconModule,MatToolbarModule,MatButtonToggleModule,MatButtonModule,MatTableModule,MatCardModule,MatInputModule
       ,MatSelectModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
