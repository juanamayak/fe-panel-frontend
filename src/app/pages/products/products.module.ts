import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateProductsComponent} from "./create-products/create-products.component";
import {ProductsComponent} from "./products.component";
import {MaterialModule} from "../../material/material.module";

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent
    },
    {
        path: 'crear',
        component: CreateProductsComponent
    },
    {
        path: '',
        redirectTo: 'crear',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        CreateProductsComponent,
        ProductsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
    ]
})
export class ProductsModule {
}
