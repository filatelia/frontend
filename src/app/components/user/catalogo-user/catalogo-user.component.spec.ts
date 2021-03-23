import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUserComponent } from './catalogo-user.component';

describe('CatalogoUserComponent', () => {
  let component: CatalogoUserComponent;
  let fixture: ComponentFixture<CatalogoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
