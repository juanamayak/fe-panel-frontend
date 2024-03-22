import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ClientsService} from "../../services/clients.service";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CategoryStatuses} from "../../constants/category-statuses";
import {CategoriesService} from "../../services/categories.service";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
    public categoriesList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'subcategories', 'status'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = CategoryStatuses;

    constructor(
        private categoriesService: CategoriesService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.spinner.show();
        this.categoriesService.getCategories().subscribe({
            next: res => {
                this.categoriesList = new MatTableDataSource(res.categories);
                this.categoriesList.sort = this.sort;
                this.categoriesList.paginator = this.paginator;
                this.spinner.hide()
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.categoriesList.filter = filterValue.trim().toLowerCase();
    }
}
