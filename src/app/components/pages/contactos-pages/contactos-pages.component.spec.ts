import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosPagesComponent } from './contactos-pages.component';

describe('ContactosPagesComponent', () => {
  let component: ContactosPagesComponent;
  let fixture: ComponentFixture<ContactosPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactosPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactosPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
