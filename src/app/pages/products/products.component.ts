import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ProductStatuses} from "../../constants/product-statuses";
import {UsersService} from "../../services/users.service";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ProductsService} from "../../services/products.service";
import {LoginComponent} from "../auth/login/login.component";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

    public productsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['sku', 'name', 'price', 'discount_type', 'status', 'active', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = ProductStatuses;

    constructor(
        private productsService: ProductsService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.spinner.show();
        this.productsService.getProducts().subscribe({
            next: res => {
                console.log(res);
                this.productsList = new MatTableDataSource(res.products);
                this.productsList.sort = this.sort;
                this.productsList.paginator = this.paginator;
                this.spinner.hide()
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    updateStatus(userUuid, status) {
        /*this.spinner.show();
        const data = { status: status ? 1 : 0}
        this.usersService.updateStatus(userUuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert((res as any).message);
                setTimeout(() => {
                    this.getUsers()
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })*/
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.productsList.filter = filterValue.trim().toLowerCase();
    }

}
