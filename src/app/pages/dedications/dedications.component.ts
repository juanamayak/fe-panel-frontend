import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryStatuses } from '../../constants/category-statuses';
import { DedicationsStatuses } from '../../constants/dedications-statuses';
import { CategoriesService } from '../../services/categories.service';
import { AlertsService } from '../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DedicationsService } from '../../services/dedications.service';
import { CreateCouponsModalComponent } from '../../components/modals/coupons/create-coupons-modal/create-coupons-modal.component';
import { CreateDedicationsModalComponent } from '../../components/modals/dedications/create-dedications-modal/create-dedications-modal.component';
import { EditCouponsModalComponent } from '../../components/modals/coupons/edit-coupons-modal/edit-coupons-modal.component';
import { EditDedicationsModalComponent } from '../../components/modals/dedications/edit-dedications-modal/edit-dedications-modal.component';

@Component({
    templateUrl: './dedications.component.html',
    styleUrl: './dedications.component.css',
})
export class DedicationsComponent implements OnInit {
    public dedicationsList: MatTableDataSource<any>;

    public displayedColumns: string[] = [
        'title',
        'message',
        'status',
        'action',
    ];
    public columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    public expandedElement: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = DedicationsStatuses;

    constructor(
        private dedicationsService: DedicationsService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.getDedications();
    }

    getDedications() {
        this.spinner.show();
        this.dedicationsService.getDedications().subscribe({
            next: (res) => {
                this.dedicationsList = new MatTableDataSource(res.messages);
                this.dedicationsList.sort = this.sort;
                this.dedicationsList.paginator = this.paginator;
                this.spinner.hide();
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    openCreateDedicationsDialog(): void {
        const dialogRef = this.dialog.open(CreateDedicationsModalComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getDedications();
            }
        });
    }

    openEditDedicationsDialog(dedication): void {
        const config = {
            data: {
                dedication,
            },
        };
        const dialogRef = this.dialog.open(
            EditDedicationsModalComponent,
            config,
        );

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getDedications();
            }
        });
    }

    deleteDedication(dedicationUuid) {
        this.alertsService
            .confirmDelete(`¿Estás seguro de eliminar esta dedicatoria?`)
            .then((res) => {
                if (res.isConfirmed) {
                    this.spinner.show();
                    this.dedicationsService
                        .deleteDedications(dedicationUuid)
                        .subscribe({
                            next: (res) => {
                                this.spinner.hide();
                                this.alertsService.successAlert(res.message);
                                setTimeout(() => {
                                    this.getDedications();
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
}
