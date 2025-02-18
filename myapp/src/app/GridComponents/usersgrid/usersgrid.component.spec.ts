import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersgridComponent } from './usersgrid.component';

describe('UsersgridComponent', () => {
  let component: UsersgridComponent;
  let fixture: ComponentFixture<UsersgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersgridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
