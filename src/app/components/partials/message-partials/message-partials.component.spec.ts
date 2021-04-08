import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePartialsComponent } from './message-partials.component';

describe('MessagePartialsComponent', () => {
  let component: MessagePartialsComponent;
  let fixture: ComponentFixture<MessagePartialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagePartialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePartialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
