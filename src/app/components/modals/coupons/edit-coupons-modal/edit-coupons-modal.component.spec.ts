import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCouponsModalComponent } from './edit-coupons-modal.component';

describe('EditCouponsModalComponent', () => {
    let component: EditCouponsModalComponent;
    let fixture: ComponentFixture<EditCouponsModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditCouponsModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditCouponsModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
