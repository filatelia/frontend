import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasCatalogoComponent } from './temas-catalogo.component';

describe('TemasCatalogoComponent', () => {
  let component: TemasCatalogoComponent;
  let fixture: ComponentFixture<TemasCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemasCatalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemasCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
