import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../interfaces/employee.interface';
import { Device } from '../../../interfaces/device';
import { EmployeesSrvService } from '../../../services/employees-srv.service';
import { DevicesSrvService } from '../../../services/devices-srv.service';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: any;
  employeeData!: Employee;
  empId!: number;
  unassignedDevicesAndCurrentEmp: Device[] = [];
  deviceCurrentEmp: number[] = [];
  imageData!: any;
  //upload
  loading: boolean = false; // Flag variable
  image!: File; // Variable to store file
  bucket:string = 'https://django-angular-employee-paraskevas.s3.eu-central-1.amazonaws.com/media/';
  finalUrl!:string;

  private empSrv : EmployeesSrvService = inject(EmployeesSrvService);
  private devSrv : DevicesSrvService = inject(DevicesSrvService);
  private uploadSrv : UploadService = inject(UploadService);

  constructor(
    private formBuilder: FormBuilder,
  //  private empSrv: EmployeesSrvService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  //  private devSrv: DevicesSrvService,
  //  private uploadSrv:UploadService
  ) {
    this.employeeForm = this.formBuilder.group({
      // id:['',Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      ownedDev: [''],
    });
  }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.params['id'];
    this.empSrv.getOneEmployee(this.empId).subscribe(
      (res:any) => {
        this.employeeData = res;
        //this.employeeForm.controls.id.patchValue(this.employeeData.id);
        this.employeeForm.controls.name.patchValue(this.employeeData.name);
        this.employeeForm.controls.email.patchValue(this.employeeData.email);
      },
      (error:any) => {
        this.toastr.warning(
          'Error',
          error.message + ' ' + error.error.email + ' ' + error.error.name,
          { timeOut: 4000 }
        );
      }
    );

    this.devSrv.getDevices().subscribe(
      (res: any) => {
        this.unassignedDevicesAndCurrentEmp = res.filter(
          (item: any) => item.owner == null || item.owner == this.empId
        );
        console.log('free and current holder of devices');
        console.log(this.unassignedDevicesAndCurrentEmp);
        res.forEach((item: any) => {
          item.owner == this.empId ? this.deviceCurrentEmp.push(item.id) : '';
        });
        console.log('holder of devices  ' + this.deviceCurrentEmp);
        this.employeeForm.controls.ownedDev.setValue(this.deviceCurrentEmp);
      },
      (error:any) => {
        this.toastr.warning(
          'Error',
          error.message + ' ' + error.error.email + ' ' + error.error.name,
          { timeOut: 4000 }
        );
      }
    );

    this.uploadSrv.uploadGetOne(this.empId).subscribe((result:any) =>
 { this.imageData=result;this.finalUrl=this.bucket+this.imageData[0].image; }
        );



  }

  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  onSubmit() {
    //console.log( this.employeeForm.value);
    let arrayDev = this.unassignedDevicesAndCurrentEmp.map(
      (item: any) => item.id
    );
    let missing = arrayDev.filter(
      (item: any) => !this.employeeForm.controls.ownedDev.value.includes(item)
    ); //difference between arrays
    console.log('missing ');
    console.log(missing);
    this.empSrv.updateEmployee(this.empId, this.employeeForm.value).subscribe(
      (res:any) => {
        console.log(
          'selected devices  ' + this.employeeForm.controls.ownedDev.value
        );
        if (this.employeeForm.controls.ownedDev.value) {
          this.employeeForm.controls.ownedDev.value.forEach((selectedId: any) => {
            this.unassignedDevicesAndCurrentEmp.forEach((free_device) => {
              free_device.id == selectedId
                ? this.devSrv
                  .updateDevice(
                    free_device.id,
                    new Device(
                      free_device.id,
                      free_device.serial_number,
                      free_device.description,
                      free_device.type,
                      this.empId
                    )
                  )
                  .subscribe() //selects
                : '';
            });
          });
        };
        if (missing) {
          missing.forEach((missing: any) => {
            this.unassignedDevicesAndCurrentEmp.forEach((free_device) => {
              free_device.id == missing
                ? this.devSrv
                  .updateDevice(
                    free_device.id,
                    new Device(
                      free_device.id,
                      free_device.serial_number,
                      free_device.description,
                      free_device.type,
                      null
                    )
                  )
                  .subscribe() //unselects
                : '';
            });
          });
        }
        this.router.navigate([
          { outlets: { primary: 'employees', menu: 'employees' } },
        ]);
      },
      (error:any) => {
        this.toastr.warning(
          'Error',
          error.message + ' ' + error.error.email + ' ' + error.error.name,
          { timeOut: 4000 }
        );
      }
    );
  }


  // On file Select
  onChange(event:any) {
    this.image = event.target.files[0];
}

// OnClick of button Upload
onUpload() {

    console.log(this.image);
  if (!this.image.type.startsWith('image')) {
    this.toastr.warning(
      'Error',
      'image files types only are accepted',
      { timeOut: 4000 }
    );
  } else {
    this.loading = !this.loading;
    this.uploadSrv.uploadEdit(this.image, this.empId).subscribe(
      (event: any) => {
        console.log(event);
        if (typeof (event) === 'object') {

          // Short link via api response
          this.imageData = event.image_url;
          this.finalUrl = this.imageData;
          this.loading = false; // Flag variable
        }
      }, (error:any) => {
        this.toastr.warning(
          'Error',
          error.message,
          { timeOut: 4000 }
        );
      }
    );

  }
}



}
