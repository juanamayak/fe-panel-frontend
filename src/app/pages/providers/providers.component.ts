import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CategoriesService} from "../../services/categories.service";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
    CreateProvidersModalComponent
} from "../../components/modals/providers/create-providers-modal/create-providers-modal.component";
import {ProvidersService} from "../../services/providers.service";

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrl: './providers.component.css'
})
export class ProvidersComponent implements OnInit {

    public providersList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'responsable_name', 'responsable_email', 'responsable_cellphone', 'active', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private providersService: ProvidersService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getProviders();
    }

    getProviders() {
        this.spinner.show();
        this.providersService.gerProviders().subscribe({
            next: res => {
                this.providersList = new MatTableDataSource(res.providers);
                this.providersList.sort = this.sort;
                this.providersList.paginator = this.paginator;
                this.spinner.hide()
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateProvidersModalComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // this.getCategories();
            }
        });
    }
}
