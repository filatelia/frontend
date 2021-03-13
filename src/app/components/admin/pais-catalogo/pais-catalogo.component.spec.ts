import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisCatalogoComponent } from './pais-catalogo.component';

describe('PaisCatalogoComponent', () => {
  let component: PaisCatalogoComponent;
  let fixture: ComponentFixture<PaisCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaisCatalogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
