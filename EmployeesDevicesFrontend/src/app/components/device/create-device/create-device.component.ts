import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { MyType } from "../../../interfaces/type.";
import { EmployeesSrvService } from "../../../services/employees-srv.service";
import { DevicesSrvService } from "../../../services/devices-srv.service";
import { Employee } from "../../../interfaces/employee.interface";

@Component({
  selector: "app-create-device",
  templateUrl: "./create-device.component.html",
  styleUrls: ["./create-device.component.css"],
})
export class CreateDeviceComponent implements OnInit {
  deviceForm: any;
  typeData: MyType[] = [
    {id:1, image:"../../assets/phone.png"},
    {id:2, image:"../../assets/laptop.png"},
    {id:3, image:"../../assets/tablet.png"}
  ];

  employees!: any;

  private empSrv : EmployeesSrvService = inject(EmployeesSrvService);
  private devSrv : DevicesSrvService = inject(DevicesSrvService);

  constructor(
    private formBuilder: FormBuilder,
   // private devSrv: DevicesSrvService,
    private toastr: ToastrService,
    private router: Router,
   // private empSrv: EmployeesSrvService
  ) {
    this.deviceForm = this.formBuilder.group({
      serial_number: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      type: [1, [Validators.required]],
      owner: [null],
    });
  }

  ngOnInit(): void {
    this.empSrv.getEmployees().subscribe(
      (res: Employee) => {
        this.employees = res;
      },
      (error:any) => {
        this.toastr.warning(
          "Error",
          error.message + " " + error.error.email + " " + error.error.name,
          { timeOut: 4000 }
        );
      }
    );
  }

  get serial_number() {
    return this.deviceForm.get("serial_number");
  }

  get description() {
    return this.deviceForm.get("description");
  }

  get type() {
    return this.deviceForm.get("type");
  }

  get owner() {
    return this.deviceForm.get("owner");
  }

  onSubmit() {
    //console.log( this.employeeForm.value);
    this.devSrv.createDevice(this.deviceForm.value).subscribe(
      (res: any) => {
        this.router.navigate([
          { outlets: { primary: "devices", menu: "devices" } },
        ]);
      },
      (error:any) => {
        this.toastr.warning(
          "Error",
          error.message +
            " " +
            error.error.serial_number +
            " " +
            error.error.description,
          { timeOut: 4000 }
        );
        console.log(error);
      }
    );
  }
}
