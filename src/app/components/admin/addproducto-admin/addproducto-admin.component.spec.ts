import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductoAdminComponent } from './addproducto-admin.component';

describe('AddproductoAdminComponent', () => {
  let component: AddproductoAdminComponent;
  let fixture: ComponentFixture<AddproductoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductoAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
