import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePermissionsModalComponent } from './manage-permissions-modal.component';

describe('ManagePermissionsModalComponent', () => {
  let component: ManagePermissionsModalComponent;
  let fixture: ComponentFixture<ManagePermissionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePermissionsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePermissionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
