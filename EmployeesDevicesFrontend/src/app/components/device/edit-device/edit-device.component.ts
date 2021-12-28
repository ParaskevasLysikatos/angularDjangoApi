import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/interfaces/device';
import { Employee } from 'src/app/interfaces/employee.interface';
import { Type } from 'src/app/interfaces/type.';
import { DevicesSrvService } from 'src/app/services/devices-srv.service';
import { EmployeesSrvService } from 'src/app/services/employees-srv.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
deviceForm:any;
employees!: any;
deviceData!: Device;
devId!:number;

 typeData: Type[] = [new Type(1, '../../assets/phone.png'), new Type(2, '../../assets/laptop.png'), new Type(3, '../../assets/tablet.png')];

  constructor(private formBuilder: FormBuilder,private devSrv:DevicesSrvService,private empSrv:EmployeesSrvService,private toastr: ToastrService, private router: Router,private activatedRoute:ActivatedRoute) {
this.deviceForm = this.formBuilder.group({
     // id:['',Validators.required],
      serial_number: ['', [Validators.required]],
      description: ['',[Validators.required, Validators.minLength(3)]],
       type: [1, [Validators.required]],
      owner: [null],
    });
  }


  ngOnInit(): void {
    this.devId = this.activatedRoute.snapshot.params['id'];
    this.empSrv.getEmployees().subscribe((res: Employee) => { this.employees = res;},(error)=>{ this.toastr.warning('Error', error.message+" "+error.error.email+" "+error.error.name,
    {timeOut: 4000});});
    this.devSrv.getOneDevice(this.devId).subscribe((res) => { this.deviceData = res;

    this.deviceForm.controls.serial_number.patchValue(this.deviceData.serial_number);
    this.deviceForm.controls.description.patchValue(this.deviceData.description);
    this.deviceForm.controls.type.patchValue(this.deviceData.type);
    this.deviceForm.controls.owner.patchValue(this.deviceData.owner);
    }
    , (error) => {
      this.toastr.warning('Error', error.message+" "+error.error.description+" "+error.error.serial_number,
        { timeOut: 4000 });
    });



  }

  get serial_number() {
    return this.deviceForm.get('serial_number');
  }

  get description() {
    return this.deviceForm.get('description');
  }

   get type() {
    return this.deviceForm.get('type');
  }

  get owner() {
    return this.deviceForm.get('owner');
  }

  onSubmit(){
   //console.log( this.employeeForm.value);
    this.devSrv.updateDevice(this.devId, this.deviceForm.value).subscribe((res) => { this.router.navigate([{ outlets: { primary: 'devices', menu: 'devices' } }]);},
    (error)=>{ this.toastr.warning('Error', error.message+" "+error.error.description+" "+error.error.serial_number,
    {timeOut: 4000});});
  }


}
