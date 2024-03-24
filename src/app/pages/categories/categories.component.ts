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
import {MatDialog} from "@angular/material/dialog";
import {
    CreateCategoriesModalComponent
} from "../../components/modals/categories/create-categories-modal/create-categories-modal.component";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.css',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CategoriesComponent implements OnInit{
    public categoriesList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'subcategories', 'status', 'action'];
    public columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    public expandedElement: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = CategoryStatuses;

    constructor(
        private categoriesService: CategoriesService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
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

    deleteCategory(categoryUuid) {
        this.alertsService.confirmDelete(`¿Estás seguro de eliminar esta categoria?`)
            .then((res) => {
                if (res.isConfirmed) {
                    this.spinner.show();
                    this.categoriesService.deleteCategories(categoryUuid).subscribe({
                        next: res => {
                            this.spinner.hide();
                            this.alertsService.successAlert((res as any).message);
                            setTimeout(() => {
                                this.getCategories()
                            }, 2500);
                        },
                        error: err => {
                            this.spinner.hide();
                            this.alertsService.errorAlert(err.error.errors);
                        }
                    })
                }
            });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateCategoriesModalComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this.getCategories();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.categoriesList.filter = filterValue.trim().toLowerCase();
    }
}
