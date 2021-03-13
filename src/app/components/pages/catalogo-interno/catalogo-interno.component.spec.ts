import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInternoComponent } from './catalogo-interno.component';

describe('CatalogoInternoComponent', () => {
  let component: CatalogoInternoComponent;
  let fixture: ComponentFixture<CatalogoInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
