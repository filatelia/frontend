import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogointernoAdminComponent } from './catalogointerno-admin.component';

describe('CatalogointernoAdminComponent', () => {
  let component: CatalogointernoAdminComponent;
  let fixture: ComponentFixture<CatalogointernoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogointernoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogointernoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
