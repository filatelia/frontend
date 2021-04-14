import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstampillaComponent } from './modal-estampilla.component';

describe('ModalEstampillaComponent', () => {
  let component: ModalEstampillaComponent;
  let fixture: ComponentFixture<ModalEstampillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEstampillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEstampillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
