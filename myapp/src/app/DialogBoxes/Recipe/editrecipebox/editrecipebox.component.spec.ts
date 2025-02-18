import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrecipeboxComponent } from './editrecipebox.component';

describe('EditrecipeboxComponent', () => {
  let component: EditrecipeboxComponent;
  let fixture: ComponentFixture<EditrecipeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditrecipeboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditrecipeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
