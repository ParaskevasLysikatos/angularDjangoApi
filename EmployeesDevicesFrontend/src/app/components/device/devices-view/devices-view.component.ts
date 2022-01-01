import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Device } from "src/app/interfaces/device";
import { Employee } from "src/app/interfaces/employee.interface";
import { Type } from "src/app/interfaces/type.";
import { DevicesSrvService } from "src/app/services/devices-srv.service";
import { EmployeesSrvService } from "src/app/services/employees-srv.service";

@Component({
  selector: "app-devices-view",
  templateUrl: "./devices-view.component.html",
  styleUrls: ["./devices-view.component.scss"],
})
export class DevicesViewComponent implements OnInit {
  displayedColumns1: string[] = [
    "id",
    "serial_number",
    "description",
    "type",
    "owner",
    "edit",
    "delete",
  ];
  dataSource1: any = [];

  //[1-phone image,2-laptop image,3-tablet image]
  typeData: Type[] = [
    new Type(1, "../../assets/phone.png"),
    new Type(2, "../../assets/laptop.png"),
    new Type(3, "../../assets/tablet.png"),
  ];

  employees!: any;

  constructor(
    private devSrv: DevicesSrvService,
    private empSrv: EmployeesSrvService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.devSrv.getDevices().subscribe(
      (res: Device) => {
        this.dataSource1 = res;
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
      }
    );

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

  DeleteDev(id: number) {
    this.devSrv.deleteDevice(id).subscribe((res) => {
      this.devSrv.getDevices().subscribe(
        (res: any) => {
          this.dataSource1 = res;
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
        }
      );
    });
  }

  GoToEditDev(url: string, id: number) {
    this.router.navigate([{ outlets: { primary: url + id, menu: url + id } }]);
  }
}
