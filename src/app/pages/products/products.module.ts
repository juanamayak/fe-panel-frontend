import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateProductsComponent} from "./create-products/create-products.component";

const routes: Routes = [
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
        CreateProductsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class ProductsModule {
}
