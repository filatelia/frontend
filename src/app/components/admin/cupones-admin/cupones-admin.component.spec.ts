import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponesAdminComponent } from './cupones-admin.component';

describe('CuponesAdminComponent', () => {
  let component: CuponesAdminComponent;
  let fixture: ComponentFixture<CuponesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuponesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
