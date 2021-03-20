import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesAdminLinkComponent } from './ajustes-admin-link.component';

describe('AjustesAdminLinkComponent', () => {
  let component: AjustesAdminLinkComponent;
  let fixture: ComponentFixture<AjustesAdminLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesAdminLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesAdminLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
