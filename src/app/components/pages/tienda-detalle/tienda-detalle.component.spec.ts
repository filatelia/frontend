import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaDetalleComponent } from './tienda-detalle.component';

describe('TiendaDetalleComponent', () => {
  let component: TiendaDetalleComponent;
  let fixture: ComponentFixture<TiendaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
