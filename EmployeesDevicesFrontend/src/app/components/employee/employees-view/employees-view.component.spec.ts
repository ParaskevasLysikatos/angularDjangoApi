import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { EmployeesViewComponent } from './employees-view.component';

describe('EmployeesViewComponent', () => {
  let component: EmployeesViewComponent;
  let fixture: ComponentFixture<EmployeesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesViewComponent ],
       imports: [BrowserDynamicTestingModule,RouterTestingModule,HttpClientTestingModule,ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
