import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaAdminComponent } from './transferencia-admin.component';

describe('TransferenciaAdminComponent', () => {
  let component: TransferenciaAdminComponent;
  let fixture: ComponentFixture<TransferenciaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
