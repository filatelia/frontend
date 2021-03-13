import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminCrudComponent } from './dashboard-admin-crud.component';

describe('DashboardAdminCrudComponent', () => {
  let component: DashboardAdminCrudComponent;
  let fixture: ComponentFixture<DashboardAdminCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdminCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
