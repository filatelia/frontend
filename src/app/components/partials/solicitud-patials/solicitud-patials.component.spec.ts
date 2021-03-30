import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudPatialsComponent } from './solicitud-patials.component';

describe('SolicitudPatialsComponent', () => {
  let component: SolicitudPatialsComponent;
  let fixture: ComponentFixture<SolicitudPatialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudPatialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPatialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
