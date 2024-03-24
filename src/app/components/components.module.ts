import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    CreateCategoriesModalComponent
} from "./modals/categories/create-categories-modal/create-categories-modal.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {
    CreateSubcategoriesModalComponent
} from "./modals/subcategories/create-subcategories-modal/create-subcategories-modal.component";
import {
    CreateProvidersModalComponent
} from "./modals/providers/create-providers-modal/create-providers-modal.component";


@NgModule({
    declarations: [
        CreateCategoriesModalComponent,
        CreateSubcategoriesModalComponent,
        CreateProvidersModalComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ComponentsModule {
}
