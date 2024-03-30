import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDedicationsModalComponent } from './create-dedications-modal.component';

describe('CreateDedicationsModalComponent', () => {
  let component: CreateDedicationsModalComponent;
  let fixture: ComponentFixture<CreateDedicationsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDedicationsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDedicationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
