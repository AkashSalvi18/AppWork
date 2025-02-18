import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserboxComponent } from './edituserbox.component';

describe('EdituserboxComponent', () => {
  let component: EdituserboxComponent;
  let fixture: ComponentFixture<EdituserboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdituserboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdituserboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
