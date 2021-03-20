import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaAdminLinkComponent } from './tienda-admin-link.component';

describe('TiendaAdminLinkComponent', () => {
  let component: TiendaAdminLinkComponent;
  let fixture: ComponentFixture<TiendaAdminLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaAdminLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaAdminLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
