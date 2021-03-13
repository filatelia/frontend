import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAdminComponent } from './catalogo-admin.component';

describe('CatalogoAdminComponent', () => {
  let component: CatalogoAdminComponent;
  let fixture: ComponentFixture<CatalogoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
