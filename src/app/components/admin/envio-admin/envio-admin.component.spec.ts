import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioAdminComponent } from './envio-admin.component';

describe('EnvioAdminComponent', () => {
  let component: EnvioAdminComponent;
  let fixture: ComponentFixture<EnvioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvioAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
