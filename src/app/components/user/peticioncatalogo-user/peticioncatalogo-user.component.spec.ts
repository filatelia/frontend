import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticioncatalogoUserComponent } from './peticioncatalogo-user.component';

describe('PeticioncatalogoUserComponent', () => {
  let component: PeticioncatalogoUserComponent;
  let fixture: ComponentFixture<PeticioncatalogoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeticioncatalogoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticioncatalogoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
