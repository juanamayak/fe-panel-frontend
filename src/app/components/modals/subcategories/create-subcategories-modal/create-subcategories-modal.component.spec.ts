import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubcategoriesModalComponent } from './create-subcategories-modal.component';

describe('CreateSubcategoriesModalComponent', () => {
    let component: CreateSubcategoriesModalComponent;
    let fixture: ComponentFixture<CreateSubcategoriesModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateSubcategoriesModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateSubcategoriesModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
