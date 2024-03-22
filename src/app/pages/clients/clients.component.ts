import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ProductsService} from "../../services/products.service";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ClientsService} from "../../services/clients.service";
import {UserStatuses} from "../../constants/user-statuses";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
    public clientsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'email', 'cellphone', 'status'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = UserStatuses;

    constructor(
        private clientsService: ClientsService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.getClients();
    }

    getClients() {
        this.spinner.show();
        this.clientsService.getClients().subscribe({
            next: res => {
                this.clientsList = new MatTableDataSource(res.clients);
                this.clientsList.sort = this.sort;
                this.clientsList.paginator = this.paginator;
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
        this.clientsList.filter = filterValue.trim().toLowerCase();
    }
}
