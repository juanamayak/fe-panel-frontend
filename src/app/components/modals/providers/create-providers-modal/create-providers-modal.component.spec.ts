import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProvidersModalComponent } from './create-providers-modal.component';

describe('CreateProvidersModalComponent', () => {
    let component: CreateProvidersModalComponent;
    let fixture: ComponentFixture<CreateProvidersModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateProvidersModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateProvidersModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
