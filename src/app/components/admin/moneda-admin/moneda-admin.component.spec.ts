import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaAdminComponent } from './moneda-admin.component';

describe('MonedaAdminComponent', () => {
  let component: MonedaAdminComponent;
  let fixture: ComponentFixture<MonedaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonedaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonedaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
