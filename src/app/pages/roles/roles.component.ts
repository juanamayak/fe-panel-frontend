import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {RolesService} from "../../services/roles.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
    public rolesList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['id', 'name', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private rolesService: RolesService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getRoles();
    }

    getRoles(){
        this.spinner.show();
        this.rolesService.getRoles().subscribe({
            next: res => {
                this.rolesList = new MatTableDataSource(res.roles);
                this.rolesList.sort = this.sort;
                this.rolesList.paginator = this.paginator;
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
        this.rolesList.filter = filterValue.trim().toLowerCase();
    }
}
