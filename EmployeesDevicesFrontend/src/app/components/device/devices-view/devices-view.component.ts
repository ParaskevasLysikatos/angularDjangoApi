import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MyType } from "../../../interfaces/type.";
import { EmployeesSrvService } from "../../../services/employees-srv.service";
import { DevicesSrvService } from "../../../services/devices-srv.service";
import { Device } from "../../../interfaces/device";
import { Employee } from "../../../interfaces/employee.interface";


@Component({
  selector: "app-devices-view",
  templateUrl: "./devices-view.component.html",
  styleUrls: ["./devices-view.component.css"],
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
  typeData: MyType[] = [
    {id:1, image:"../../assets/phone.png"},
   {id:2, image:"../../assets/laptop.png"},
   {id:3, image:"../../assets/tablet.png"}
  ];

  employees!: any;

  constructor(
  //  private devSrv: DevicesSrvService,
  //  private empSrv: EmployeesSrvService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private empSrv : EmployeesSrvService = inject(EmployeesSrvService);
  private devSrv : DevicesSrvService = inject(DevicesSrvService);

  ngOnInit(): void {
    this.devSrv.getDevices().subscribe(
      (res: Device) => {
        this.dataSource1 = res;
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
      }
    );

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

  DeleteDev(id: number) {
    this.devSrv.deleteDevice(id).subscribe((res) => {
      this.devSrv.getDevices().subscribe(
        (res: any) => {
          this.dataSource1 = res;
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
        }
      );
    });
  }

  GoToEditDev(url: string, id: number) {
    this.router.navigate([{ outlets: { primary: url + id, menu: url + id } }]);
  }
}
