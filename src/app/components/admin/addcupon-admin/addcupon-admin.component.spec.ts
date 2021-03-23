import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcuponAdminComponent } from './addcupon-admin.component';

describe('AddcuponAdminComponent', () => {
  let component: AddcuponAdminComponent;
  let fixture: ComponentFixture<AddcuponAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcuponAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcuponAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
