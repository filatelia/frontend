import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraAdminComponent } from './cabecera-admin.component';

describe('CabeceraAdminComponent', () => {
  let component: CabeceraAdminComponent;
  let fixture: ComponentFixture<CabeceraAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabeceraAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
