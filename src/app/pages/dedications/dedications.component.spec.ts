import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DedicationsComponent } from './dedications.component';

describe('DedicationsComponent', () => {
    let component: DedicationsComponent;
    let fixture: ComponentFixture<DedicationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DedicationsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DedicationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
