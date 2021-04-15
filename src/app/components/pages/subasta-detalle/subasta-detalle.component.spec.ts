import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastaDetalleComponent } from './subasta-detalle.component';

describe('SubastaDetalleComponent', () => {
  let component: SubastaDetalleComponent;
  let fixture: ComponentFixture<SubastaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubastaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubastaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
