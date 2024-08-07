import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ProductsComponent } from './products.component';
import { MaterialModule } from '../../material/material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
    },
    {
        path: 'crear',
        component: CreateProductsComponent,
    },
    {
        path: ':uuid',
        component: ProductDetailsComponent,
    },
    {
        path: '',
        redirectTo: 'crear',
        pathMatch: 'full',
    },
];

@NgModule({
    declarations: [
        CreateProductsComponent,
        ProductsComponent,
        ProductDetailsComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        CurrencyMaskModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ProductsModule {}
