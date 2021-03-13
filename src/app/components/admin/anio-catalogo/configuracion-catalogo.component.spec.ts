import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionCatalogoComponent } from './configuracion-catalogo.component';

describe('ConfiguracionCatalogoComponent', () => {
  let component: ConfiguracionCatalogoComponent;
  let fixture: ComponentFixture<ConfiguracionCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionCatalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
