import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { DevicesViewComponent } from './devices-view.component';

describe('DevicesViewComponent', () => {
  let component: DevicesViewComponent;
  let fixture: ComponentFixture<DevicesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesViewComponent ],
       imports: [BrowserDynamicTestingModule,RouterTestingModule,HttpClientTestingModule,ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
