import { Component, OnInit, Type, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Device } from "../../../interfaces/device";
import { Employee } from "../../../interfaces/employee.interface";
import { EmployeesSrvService } from "../../../services/employees-srv.service";
import { DevicesSrvService } from "../../../services/devices-srv.service";
import { MyType } from "../../../interfaces/type.";

@Component({
  selector: "app-edit-device",
  templateUrl: "./edit-device.component.html",
  styleUrls: ["./edit-device.component.css"],
})
export class EditDeviceComponent implements OnInit {
  deviceForm: any;
  employees!: any;
  deviceData!: Device;
  devId!: number;

  typeData: MyType[] = [
   {id:1, image:"../../assets/phone.png"},
   {id:2, image:"../../assets/laptop.png"},
   {id:3, image:"../../assets/tablet.png"}
  ];

  private empSrv : EmployeesSrvService = inject(EmployeesSrvService);
  private devSrv : DevicesSrvService = inject(DevicesSrvService);

  constructor(
    private formBuilder: FormBuilder,
  //  private devSrv: DevicesSrvService,
  //  private empSrv: EmployeesSrvService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.deviceForm = this.formBuilder.group({
      // id:['',Validators.required],
      serial_number: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      type: [1, [Validators.required]],
      owner: [null],
    });
  }

  ngOnInit(): void {
    this.devId = this.activatedRoute.snapshot.params["id"];
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
    this.devSrv.getOneDevice(this.devId).subscribe(
      (res:any) => {
        this.deviceData = res;

        this.deviceForm.controls.serial_number.patchValue(
          this.deviceData.serial_number
        );
        this.deviceForm.controls.description.patchValue(
          this.deviceData.description
        );
        this.deviceForm.controls.type.patchValue(this.deviceData.type);
        this.deviceForm.controls.owner.patchValue(this.deviceData.owner);
      },
      (error:any) => {
        this.toastr.warning(
          "Error",
          error.message +
            " " +
            error.error.description +
            " " +
            error.error.serial_number,
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
    this.devSrv.updateDevice(this.devId, this.deviceForm.value).subscribe(
      (res:any) => {
        this.router.navigate([
          { outlets: { primary: "devices", menu: "devices" } },
        ]);
      },
      (error:any) => {
        this.toastr.warning(
          "Error",
          error.message +
            " " +
            error.error.description +
            " " +
            error.error.serial_number,
          { timeOut: 4000 }
        );
      }
    );
  }
}
