import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalAdminComponent } from './paypal-admin.component';

describe('PaypalAdminComponent', () => {
  let component: PaypalAdminComponent;
  let fixture: ComponentFixture<PaypalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaypalAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
