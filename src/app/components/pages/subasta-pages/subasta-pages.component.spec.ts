import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastaPagesComponent } from './subasta-pages.component';

describe('SubastaPagesComponent', () => {
  let component: SubastaPagesComponent;
  let fixture: ComponentFixture<SubastaPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubastaPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubastaPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
