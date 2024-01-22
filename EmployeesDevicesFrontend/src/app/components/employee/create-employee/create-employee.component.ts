import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EmployeesSrvService } from "../../../services/employees-srv.service";
import { DevicesSrvService } from "../../../services/devices-srv.service";
import { UploadService } from "../../../services/upload.service";
import { Device } from "../../../interfaces/device";


@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.css"],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: any;
  unassignedDevices: Device[] = [];
  //upload
  loading: boolean = false; // Flag variable
  image!: File; // Variable to store file

  private empSrv : EmployeesSrvService = inject(EmployeesSrvService);
  private devSrv : DevicesSrvService = inject(DevicesSrvService);
  private uploadSrv : UploadService = inject(UploadService);
  constructor(
    private formBuilder: FormBuilder,
   // private empSrv: EmployeesSrvService,
    private toastr: ToastrService,
    private router: Router,
   // private devSrv: DevicesSrvService,
    // private uploadSrv:UploadService
  ) {
    this.employeeForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      ownedDev: [''],
    });
  }

  ngOnInit(): void {
    this.devSrv.getDevices().subscribe(
      (res: any) => {
        this.unassignedDevices = res.filter((item: any) => item.owner == null);
        console.log("free devices");
        console.log(this.unassignedDevices);
      },
      (error: any) => {
        this.toastr.warning(
          "Error",
          error.message + " " + error.error.email + " " + error.error.name,
          { timeOut: 4000 }
        );
      }
    );
  }

  get name() {
    return this.employeeForm.get("name");
  }

  get email() {
    return this.employeeForm.get("email");
  }

  onSubmit() {
    //console.log( this.employeeForm.value);
    this.empSrv.createEmployee(this.employeeForm.value).subscribe(
      (res: any) => {
        console.log(
          "selected devices  " + this.employeeForm.controls.ownedDev.value
        );
        if (this.employeeForm.controls.ownedDev.value) {//check free devices
          this.employeeForm.controls.ownedDev.value.forEach((selectedId: any) => {
            this.unassignedDevices.forEach((free_device) => {
              free_device.id == selectedId
                ? this.devSrv
                  .updateDevice(
                    free_device.id,
                    new Device(
                      free_device.id,
                      free_device.serial_number,
                      free_device.description,
                      free_device.type,
                      res.id
                    )
                  )
                  .subscribe() //selects
                : "";
            });
          });
        };
        this.onUpload(res.id);//first employee must be created,then image upload(requires emp id)
        this.router.navigate([
          { outlets: { primary: "employees", menu: "employees" } },
        ]);
      },
      (error:any) => {
        this.toastr.warning(
          "Error",
          error.message + " " + error.error.email + " " + error.error.name,
          { timeOut: 4000 }
        );
        console.log(error);
      }
    );
  }

 // On file Select
  onChange(event:any) {
    this.image = event.target.files[0];
}


  onUpload(id:number) {

    console.log(this.image);
  if (!this.image.type.startsWith('image')) {
    this.toastr.warning(
      'Error',
      'image files types only are accepted',
      { timeOut: 4000 }
    );
  } else {
    this.loading = !this.loading;
    this.uploadSrv.uploadCreate(this.image,id).subscribe(
      (event: any) => {
        console.log(event);
        if (typeof (event) === 'object') {

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
