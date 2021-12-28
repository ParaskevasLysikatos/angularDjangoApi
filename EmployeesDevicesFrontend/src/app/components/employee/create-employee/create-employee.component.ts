import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/interfaces/device';
import { Employee } from 'src/app/interfaces/employee.interface';
import { DevicesSrvService } from 'src/app/services/devices-srv.service';
import { EmployeesSrvService } from 'src/app/services/employees-srv.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
 employeeForm:any;
unassignedDevices: Device[] = [];
  constructor(private formBuilder: FormBuilder,private empSrv:EmployeesSrvService,private toastr: ToastrService, private router: Router,private devSrv:DevicesSrvService) {
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      ownedDev: [''],
    });
  }

  ngOnInit(): void {
    this.devSrv.getDevices().subscribe((res: any) => {
      this.unassignedDevices = res.filter((item: any) => item.owner == null);
      console.log("free devices");
      console.log(this.unassignedDevices);
    },(error:any)=>{ this.toastr.warning('Error', error.message+" "+error.error.email+" "+error.error.name,
    {timeOut: 4000});})
  }

   get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  onSubmit(){
   //console.log( this.employeeForm.value);
    this.empSrv.createEmployee(this.employeeForm.value).subscribe((res: any) => {
       console.log("selected devices  "+this.employeeForm.controls.ownedDev.value);
      this.employeeForm.controls.ownedDev.value.forEach((selectedId:any)=>{
        this.unassignedDevices.forEach((free_device)=>{
          free_device.id == selectedId ? this.devSrv.updateDevice(free_device.id, new Device(free_device.id, free_device.serial_number, free_device.description, free_device.type,res.id)).subscribe()//selects
            : '';
        })
      })
    this.router.navigate([{ outlets: { primary: 'employees', menu: 'employees' } }]);},
    (error)=>{ this.toastr.warning('Error',error.message+" "+error.error.email+" "+error.error.name,
    {timeOut: 4000});console.log(error);});
  }

}
