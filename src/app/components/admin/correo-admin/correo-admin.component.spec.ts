import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoAdminComponent } from './correo-admin.component';

describe('CorreoAdminComponent', () => {
  let component: CorreoAdminComponent;
  let fixture: ComponentFixture<CorreoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorreoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
