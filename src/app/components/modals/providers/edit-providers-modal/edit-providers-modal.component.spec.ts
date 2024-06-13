import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProvidersModalComponent } from './edit-providers-modal.component';

describe('EditProvidersModalComponent', () => {
    let component: EditProvidersModalComponent;
    let fixture: ComponentFixture<EditProvidersModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditProvidersModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditProvidersModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
