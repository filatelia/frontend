import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MancolistaComponent } from './mancolista.component';

describe('MancolistaComponent', () => {
  let component: MancolistaComponent;
  let fixture: ComponentFixture<MancolistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MancolistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MancolistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
