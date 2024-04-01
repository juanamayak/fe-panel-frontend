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
import {EditProvidersModalComponent} from "./modals/providers/edit-providers-modal/edit-providers-modal.component";
import {CreateUserModalComponent} from "./modals/users/create-user-modal/create-user-modal.component";
import {EditUsersModalComponent} from "./modals/users/edit-users-modal/edit-users-modal.component";
import {CreateCouponsModalComponent} from "./modals/coupons/create-coupons-modal/create-coupons-modal.component";
import {EditCouponsModalComponent} from "./modals/coupons/edit-coupons-modal/edit-coupons-modal.component";
import {
    CreateDedicationsModalComponent
} from "./modals/dedications/create-dedications-modal/create-dedications-modal.component";
import {
    EditDedicationsModalComponent
} from "./modals/dedications/edit-dedications-modal/edit-dedications-modal.component";
import {
    ManagePermissionsModalComponent
} from "./modals/permissions/manage-permissions-modal/manage-permissions-modal.component";


@NgModule({
    declarations: [
        CreateCategoriesModalComponent,
        CreateSubcategoriesModalComponent,
        CreateProvidersModalComponent,
        EditProvidersModalComponent,
        CreateUserModalComponent,
        EditUsersModalComponent,
        CreateCouponsModalComponent,
        EditCouponsModalComponent,
        CreateDedicationsModalComponent,
        EditDedicationsModalComponent,
        ManagePermissionsModalComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ComponentsModule {
}
