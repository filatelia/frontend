import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MimancolistapublicaPageComponent } from './mimancolistapublica-page.component';

describe('MimancolistapublicaPageComponent', () => {
  let component: MimancolistapublicaPageComponent;
  let fixture: ComponentFixture<MimancolistapublicaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MimancolistapublicaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MimancolistapublicaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
