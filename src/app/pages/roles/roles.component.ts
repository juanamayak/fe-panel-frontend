import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../services/users.service";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {RolesService} from "../../services/roles.service";
import {CreateUserModalComponent} from "../../components/modals/users/create-user-modal/create-user-modal.component";
import {
    ManagePermissionsModalComponent
} from "../../components/modals/permissions/manage-permissions-modal/manage-permissions-modal.component";

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
        public dialog: MatDialog
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

    openManagePermissionsModal(){
        this.dialog.open(ManagePermissionsModalComponent, { panelClass: 'w-1/3'});
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.rolesList.filter = filterValue.trim().toLowerCase();
    }
}
