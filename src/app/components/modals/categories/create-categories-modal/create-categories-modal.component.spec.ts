import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriesModalComponent } from './create-categories-modal.component';

describe('CreateCategoriesModalComponent', () => {
    let component: CreateCategoriesModalComponent;
    let fixture: ComponentFixture<CreateCategoriesModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateCategoriesModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateCategoriesModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
