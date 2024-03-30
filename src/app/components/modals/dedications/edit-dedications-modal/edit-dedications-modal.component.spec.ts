import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDedicationsModalComponent } from './edit-dedications-modal.component';

describe('EditDedicationsModalComponent', () => {
  let component: EditDedicationsModalComponent;
  let fixture: ComponentFixture<EditDedicationsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDedicationsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDedicationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
