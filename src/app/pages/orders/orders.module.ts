import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { CreateProductsComponent } from '../products/create-products/create-products.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';
import { OrdersComponent } from './orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {MaterialModule} from "../../material/material.module";

const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
    },
    {
        path: ':uuid',
        component: OrderDetailComponent,
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    declarations: [OrderDetailComponent],
    imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class OrdersModule {}
