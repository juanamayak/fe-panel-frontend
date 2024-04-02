import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PermissionsComponent} from "./permissions/permissions.component";
import {RolesComponent} from "./roles.component";
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: RolesComponent
    },
    {
        path: 'permisos',
        component: PermissionsComponent
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        PermissionsComponent,
        RolesComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ]
})
export class RolesModule {
}
