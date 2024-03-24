import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from "../material/material.module";
import { UsersComponent } from './users/users.component';
import {OrdersComponent} from "./orders/orders.component";
import {ClientsComponent} from "./clients/clients.component";
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ProvidersComponent} from "./providers/providers.component";
import {CouponsComponent} from "./coupons/coupons.component";
import {DeliveryHoursComponent} from "./delivery-hours/delivery-hours.component";
import {DedicationsComponent} from "./dedications/dedications.component";
import {LanguagesComponent} from "./languages/languages.component";
import {ComponentsModule} from "../components/components.module";
import {SubcategoriesComponent} from "./categories/subcategories/subcategories.component";

const routes: Routes = [
    { path: 'inicio', component: HomeComponent },
    { path: 'pedidos', component: OrdersComponent },
    { path: 'clientes', component: ClientsComponent },
    { path: 'productos', component: ProductsComponent },
    {
        path: 'productos',
        children: [
            {
                path: '',
                loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsModule)
            }
        ]
    },
    { path: 'categorias', component: CategoriesComponent },
    { path: 'florerias', component: ProvidersComponent },
    { path: 'florerias', component: ProvidersComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: 'cupones', component: CouponsComponent },
    { path: 'horarios', component: DeliveryHoursComponent },
    { path: 'dedicatorias', component: DedicationsComponent },
    { path: 'idiomas', component: LanguagesComponent },
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    }
]

@NgModule({
    declarations: [
        HomeComponent,
        OrdersComponent,
        UsersComponent,
        ProductsComponent,
        ClientsComponent,
        CategoriesComponent,
        SubcategoriesComponent,
        ProvidersComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ]
})
export class PagesModule {
}
