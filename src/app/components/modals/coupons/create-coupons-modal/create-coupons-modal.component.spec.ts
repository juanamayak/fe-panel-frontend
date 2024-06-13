import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCouponsModalComponent } from './create-coupons-modal.component';

describe('CreateCouponsModalComponent', () => {
    let component: CreateCouponsModalComponent;
    let fixture: ComponentFixture<CreateCouponsModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateCouponsModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateCouponsModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
