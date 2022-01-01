import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Employee } from "src/app/interfaces/employee.interface";
import { Type } from "src/app/interfaces/type.";
import { DevicesSrvService } from "src/app/services/devices-srv.service";
import { EmployeesSrvService } from "src/app/services/employees-srv.service";

@Component({
  selector: "app-create-device",
  templateUrl: "./create-device.component.html",
  styleUrls: ["./create-device.component.scss"],
})
export class CreateDeviceComponent implements OnInit {
  deviceForm: any;
  typeData: Type[] = [
    new Type(1, "../../assets/phone.png"),
    new Type(2, "../../assets/laptop.png"),
    new Type(3, "../../assets/tablet.png"),
  ];

  employees!: any;

  constructor(
    private formBuilder: FormBuilder,
    private devSrv: DevicesSrvService,
    private toastr: ToastrService,
    private router: Router,
    private empSrv: EmployeesSrvService
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
      (error) => {
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
      (error) => {
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
