import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDeviceComponent } from './components/device/create-device/create-device.component';
import { DevicesViewComponent } from './components/device/devices-view/devices-view.component';
import { EditDeviceComponent } from './components/device/edit-device/edit-device.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { EmployeesViewComponent } from './components/employee/employees-view/employees-view.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

describe('AppComponent', () => {
  const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'edit-employee/:id', component: EditEmployeeComponent,outlet:"menu"},
   { path: 'employees', component: EmployeesViewComponent,outlet:"menu" },
  { path: 'create-employee', component: CreateEmployeeComponent,outlet:"menu" },


   { path: 'devices', component: DevicesViewComponent,outlet:"menu" },
     { path: 'edit-device/:id', component: EditDeviceComponent,outlet:"menu"},
      { path: 'create-device', component: CreateDeviceComponent,outlet:"menu" },
   ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,MDBBootstrapModule.forRoot(),
        ToastrModule.forRoot(),
        BrowserModule,
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
        MatSidenavModule,MatListModule,MatIconModule,MatToolbarModule,MatButtonToggleModule,MatButtonModule,MatTableModule,MatCardModule,MatInputModule
           ,MatSelectModule
      ],
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'EmployeesDevicesFrontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('EmployeesDevicesFrontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('EmployeesDevicesFrontend app is running!');
  });





});
