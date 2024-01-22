import { Component, OnInit, SimpleChanges, ViewChild, inject } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { EmployeesSrvService } from "../../services/employees-srv.service";
import { DevicesSrvService } from "../../services/devices-srv.service";


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit {
  @ViewChild("sidenav") sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu1: boolean = false; //to separate the display on and off of the employees sub menu and devices sub menu
  showSubSubMenu: boolean = false;
  hideMenuE: boolean = false;
  hideMenuD: boolean = false;
  currentRoute!: string;

  allEmpCounter!: number;
  allDevCounter!: number;
  devWithout!: number;
  devWithEmp!: number;
  constructor(
    protected route: Router,
   // private empSrv: EmployeesSrvService,
  //  private devSrv: DevicesSrvService,
    private toastr: ToastrService
  ) {}
  private empSrv : EmployeesSrvService = inject(EmployeesSrvService);
  private devSrv : DevicesSrvService = inject(DevicesSrvService);

  ngOnInit(): void {
    //at the beginning calculate my database emp-dev
    this.allEmpCounter = 0;
    this.allDevCounter = 0;
    this.devWithout = 0;
    this.devWithEmp = 0;
    this.empSrv.getEmployees().subscribe(
      (result: any) => {
        result.forEach((item: any) => this.allEmpCounter++);
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
        result.forEach((item: any) => this.allDevCounter++);
        result.forEach((item: any) =>
          item.owner == null ? this.devWithout++ : this.devWithEmp++
        );
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
  }

  ngDoCheck(): void {
    // to hide or unhide the homepage based on url
    // console.log(this.route.url);
    this.currentRoute = this.route.url;
  }

  myCheck() {
    //on click of view home page calculate again for changes emp-dev
    this.allEmpCounter = 0;
    this.allDevCounter = 0;
    this.devWithout = 0;
    this.devWithEmp = 0;
    this.empSrv.getEmployees().subscribe(
      (result: any) => {
        result.forEach((item: any) => this.allEmpCounter++);
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
        result.forEach((item: any) => this.allDevCounter++);
        result.forEach((item: any) =>
          item.owner == null ? this.devWithout++ : this.devWithEmp++
        );
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
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
