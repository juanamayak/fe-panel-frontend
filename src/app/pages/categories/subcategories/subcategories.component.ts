import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../../../services/users.service';
import { AlertsService } from '../../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubcategoryStatuses } from '../../../constants/subcategory-statuses';
import { CreateCategoriesModalComponent } from '../../../components/modals/categories/create-categories-modal/create-categories-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateSubcategoriesModalComponent } from '../../../components/modals/subcategories/create-subcategories-modal/create-subcategories-modal.component';
import { SubcategoriesService } from '../../../services/subcategories.service';

@Component({
    selector: 'app-subcategories',
    templateUrl: './subcategories.component.html',
    styleUrl: './subcategories.component.css',
})
export class SubcategoriesComponent implements OnInit {
    @Input() category: any;
    @Output() subcategoryEmmiter = new EventEmitter<string>();

    public subcategoriesList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'status', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = SubcategoryStatuses;

    constructor(
        private subcategoriesService: SubcategoriesService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.subcategoriesList = new MatTableDataSource(
            this.category.subcategories,
        );
        this.subcategoriesList.sort = this.sort;
        this.subcategoriesList.paginator = this.paginator;
    }

    deleteSubcategory(subcategoryUuid) {
        this.alertsService
            .confirmDelete(`¿Estás seguro de eliminar esta subcategoria?`)
            .then((res) => {
                if (res.isConfirmed) {
                    this.spinner.show();
                    this.subcategoriesService
                        .deleteSubcategories(subcategoryUuid)
                        .subscribe({
                            next: (res) => {
                                this.spinner.hide();
                                this.alertsService.successAlert(
                                    (res as any).message,
                                );
                                setTimeout(() => {
                                    this.subcategoryEmmiter.emit();
                                }, 2500);
                            },
                            error: (err) => {
                                this.spinner.hide();
                                this.alertsService.errorAlert(err.error.errors);
                            },
                        });
                }
            });
    }

    openDialog(): void {
        const data = {
            data: {
                category: this.category,
            },
        };
        const dialogRef = this.dialog.open(
            CreateSubcategoriesModalComponent,
            data,
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.subcategoryEmmiter.emit(result);
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.subcategoriesList.filter = filterValue.trim().toLowerCase();
    }
}
