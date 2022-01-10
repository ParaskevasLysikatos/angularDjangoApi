import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateDeviceComponent } from './components/device/create-device/create-device.component';
import { DevicesViewComponent } from './components/device/devices-view/devices-view.component';
import { EditDeviceComponent } from './components/device/edit-device/edit-device.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { EmployeesViewComponent } from './components/employee/employees-view/employees-view.component';


const routes: Routes = [
   { path: '', component: AppComponent},
   { path: 'edit-employee/:id', component: EditEmployeeComponent,outlet:"menu"},
  { path: 'employees', component: EmployeesViewComponent,outlet:"menu" },
 { path: 'create-employee', component: CreateEmployeeComponent,outlet:"menu" },


  { path: 'devices', component: DevicesViewComponent,outlet:"menu" },
    { path: 'edit-device/:id', component: EditDeviceComponent,outlet:"menu"},
     { path: 'create-device', component: CreateDeviceComponent,outlet:"menu" },
  { path: '**', component:AppComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

