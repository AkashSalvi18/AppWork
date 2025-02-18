import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpipeComponent } from './filterpipe.component';

describe('FilterpipeComponent', () => {
  let component: FilterpipeComponent;
  let fixture: ComponentFixture<FilterpipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterpipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterpipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
