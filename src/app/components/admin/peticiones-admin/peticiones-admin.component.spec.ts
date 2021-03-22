import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesAdminComponent } from './peticiones-admin.component';

describe('PeticionesAdminComponent', () => {
  let component: PeticionesAdminComponent;
  let fixture: ComponentFixture<PeticionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeticionesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
