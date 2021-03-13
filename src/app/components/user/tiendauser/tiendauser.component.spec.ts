import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendauserComponent } from './tiendauser.component';

describe('TiendauserComponent', () => {
  let component: TiendauserComponent;
  let fixture: ComponentFixture<TiendauserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendauserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendauserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
