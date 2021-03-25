import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcorreoAdminComponent } from './addcorreo-admin.component';

describe('AddcorreoAdminComponent', () => {
  let component: AddcorreoAdminComponent;
  let fixture: ComponentFixture<AddcorreoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcorreoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcorreoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
