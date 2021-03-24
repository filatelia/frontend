import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaisesComponent } from './search-paises.component';

describe('SearchPaisesComponent', () => {
  let component: SearchPaisesComponent;
  let fixture: ComponentFixture<SearchPaisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPaisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
