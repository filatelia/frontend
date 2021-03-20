import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasAdminComponent } from './temas-admin.component';

describe('TemasAdminComponent', () => {
  let component: TemasAdminComponent;
  let fixture: ComponentFixture<TemasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
