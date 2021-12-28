import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/interfaces/employee.interface';
import { DevicesSrvService } from 'src/app/services/devices-srv.service';
import { EmployeesSrvService } from 'src/app/services/employees-srv.service';



export class OwnerManager{
  empId: number;
  deviceCounter: number;
  constructor(id: number,counter: number){
    this.empId = id;
    this.deviceCounter = counter;
  }

}


@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})


export class EmployeesViewComponent implements OnInit {

  displayedColumns1: string[] = ['id', 'name', 'email', 'owned devices', 'edit','delete'];
  dataSource1: any=[];

  devicesData: any;
  arrayDevCounter: OwnerManager[]=[];


  constructor(private empSrv:EmployeesSrvService,private toastr: ToastrService,private router: Router,private devSrv: DevicesSrvService) { }

  ngOnInit(): void {

    this.empSrv.getEmployees().subscribe((res: any) => { this.dataSource1 = res;},(error)=>{ this.toastr.warning('Error', error.message+" "+error.error.email+" "+error.error.name,
    {timeOut: 4000});});
    this.devSrv.getDevices().subscribe((result: any) => { this.devicesData = result; this.CalcEmployeeDevices();}
                  ,(error)=>{ this.toastr.warning('Error', error.message+" "+error.error.serial_number+" "+error.error.description,
    {timeOut: 4000});})
  }



  DeleteEmp(id:number){
    this.empSrv.deleteEmployee(id).subscribe((res) => {
      this.empSrv.getEmployees().subscribe((res: any) => { this.dataSource1 = res;},
    (error)=>{ this.toastr.warning('Error', error.message+" "+error.error.email+" "+error.error.name,
    {timeOut: 4000});}
    );});

  }

GoToEditEmp(url:string,id:number){
  this.router.navigate([{ outlets: { primary: url +  id, menu: url +  id } }]);
}


CalcEmployeeDevices(){
  let i=0
  this.dataSource1.forEach((emp: any)=>{
    this.devicesData.forEach((dev: any)=>{
      emp.id==dev.owner ? i++ : ''
    })
    this.arrayDevCounter.push(new OwnerManager(emp.id,i)); i = 0;
  })
}


}
