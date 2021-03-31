import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMancolistaComponent } from './modal-mancolista.component';

describe('ModalMancolistaComponent', () => {
  let component: ModalMancolistaComponent;
  let fixture: ComponentFixture<ModalMancolistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMancolistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMancolistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
