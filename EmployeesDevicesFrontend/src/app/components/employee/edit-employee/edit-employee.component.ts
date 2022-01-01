import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Device } from "src/app/interfaces/device";
import { Employee } from "src/app/interfaces/employee.interface";
import { DevicesSrvService } from "src/app/services/devices-srv.service";
import { EmployeesSrvService } from "src/app/services/employees-srv.service";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.scss"],
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: any;
  employeeData!: Employee;
  empId!: number;
  unassignedDevicesAndCurrentEmp: Device[] = [];
  deviceCurrentEmp: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private empSrv: EmployeesSrvService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private devSrv: DevicesSrvService
  ) {
    this.employeeForm = this.formBuilder.group({
      // id:['',Validators.required],
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      ownedDev: [""],
    });
  }

  ngOnInit(): void {
    this.empId = this.activatedRoute.snapshot.params["id"];
    this.empSrv.getOneEmployee(this.empId).subscribe(
      (res) => {
        this.employeeData = res;
        //this.employeeForm.controls.id.patchValue(this.employeeData.id);
        this.employeeForm.controls.name.patchValue(this.employeeData.name);
        this.employeeForm.controls.email.patchValue(this.employeeData.email);
      },
      (error) => {
        this.toastr.warning(
          "Error",
          error.message + " " + error.error.email + " " + error.error.name,
          { timeOut: 4000 }
        );
      }
    );

    this.devSrv.getDevices().subscribe(
      (res: any) => {
        this.unassignedDevicesAndCurrentEmp = res.filter(
          (item: any) => item.owner == null || item.owner == this.empId
        );
        console.log("free and current holder of devices");
        console.log(this.unassignedDevicesAndCurrentEmp);
        res.forEach((item: any) => {
          item.owner == this.empId ? this.deviceCurrentEmp.push(item.id) : "";
        });
        console.log("holder of devices  " + this.deviceCurrentEmp);
        this.employeeForm.controls.ownedDev.setValue(this.deviceCurrentEmp);
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

  get name() {
    return this.employeeForm.get("name");
  }

  get email() {
    return this.employeeForm.get("email");
  }

  onSubmit() {
    //console.log( this.employeeForm.value);
    let arrayDev = this.unassignedDevicesAndCurrentEmp.map(
      (item: any) => item.id
    );
    let missing = arrayDev.filter(
      (item: any) => !this.employeeForm.controls.ownedDev.value.includes(item)
    ); //difference between arrays
    console.log("missing ");
    console.log(missing);
    this.empSrv.updateEmployee(this.empId, this.employeeForm.value).subscribe(
      (res) => {
        console.log(
          "selected devices  " + this.employeeForm.controls.ownedDev.value
        );
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
              : "";
          });
        });
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
              : "";
          });
        });
        this.router.navigate([
          { outlets: { primary: "employees", menu: "employees" } },
        ]);
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
}
