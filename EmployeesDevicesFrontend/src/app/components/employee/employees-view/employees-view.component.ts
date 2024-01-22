import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { EmployeesSrvService } from "../../../services/employees-srv.service";
import { DevicesSrvService } from "../../../services/devices-srv.service";
import { UploadService } from "../../../services/upload.service";


export class OwnerManager {
  empId: number;
  deviceCounter: number;
  constructor(id: number, counter: number) {
    this.empId = id;
    this.deviceCounter = counter;
  }
}

@Component({
  selector: "app-employees-view",
  templateUrl: "./employees-view.component.html",
  styleUrl: "./employees-view.component.css",
})
export class EmployeesViewComponent implements OnInit {
  displayedColumns1: string[] = [
    "id",
    "name",
    "email",
    "owned-devices",
    "image",
    "edit",
    "delete",
  ];
  dataSource1: any = [];

  devicesData: any;
  arrayDevCounter: OwnerManager[] = [];
  break!:boolean;
  imageData!: any;
  //image
  bucket:string = 'https://django-angular-employee-paraskevas.s3.eu-central-1.amazonaws.com/media/';

  constructor(
  //  private empSrv: EmployeesSrvService,
    private toastr: ToastrService,
    private router: Router,
  //  private devSrv: DevicesSrvService,
   // private uploadSrv:UploadService
  ) {}
  private empSrv : EmployeesSrvService = inject(EmployeesSrvService);
  private devSrv : DevicesSrvService = inject(DevicesSrvService);
  private uploadSrv : UploadService = inject(UploadService);

  ngOnInit(): void {
    this.empSrv.getEmployees().subscribe(
      (res: any) => {
        this.dataSource1 = res;
      },
      (error:any) => {
        this.toastr.warning(
          "Error",
          error.message + " " + error.error.email + " " + error.error.name,
          { timeOut: 4000 }
        );
      }
    );
    this.devSrv.getDevices().subscribe(
      (result: any) => {
        this.devicesData = result;
        this.CalcEmployeeDevices();
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

     this.uploadSrv.uploadGetAll().subscribe((result:any) =>
 { this.imageData=result;}
        );
  }

  DeleteEmp(id: number) {
    this.empSrv.deleteEmployee(id).subscribe((res:any) => {
      this.empSrv.getEmployees().subscribe(
        (res: any) => {
          this.dataSource1 = res;
        },
        (error:any) => {
          this.toastr.warning(
            "Error",
            error.message + " " + error.error.email + " " + error.error.name,
            { timeOut: 4000 }
          );
        }
      );
    });
  }

  GoToEditEmp(url: string, id: number) {
    this.router.navigate([{ outlets: { primary: url + id, menu: url + id } }]);
  }

  CalcEmployeeDevices() {
    let i = 0;
    this.dataSource1.forEach((emp: any) => {
      this.devicesData.forEach((dev: any) => {
        emp.id == dev.owner ? i++ : "";
      });
      this.arrayDevCounter.push(new OwnerManager(emp.id, i));
      i = 0;
    });
  }
}
