import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {UserRoles} from "../../constants/user-roles";
import {UsersService} from "../../services/users.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserStatuses} from "../../constants/user-statuses";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public usersList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'email', 'role', 'status', 'active', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public developers: any;

    public roles = UserRoles;
    public statuses = UserStatuses;

    constructor(
        private usersService: UsersService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.spinner.show();
        this.usersService.getUsers().subscribe({
            next: res => {
                this.usersList = new MatTableDataSource(res.users);
                this.usersList.sort = this.sort;
                this.usersList.paginator = this.paginator;
                this.spinner.hide()
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    updateStatus(userUuid, status){
        this.spinner.show();
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
        })
    }


    deleteUser(userUuid) {
        console.log(userUuid);
        this.alertsService.confirmDelete(`¿Estás seguro de eliminar este usuario?`)
            .then((res) => {
                if (res.isConfirmed) {
                    this.spinner.show();
                    this.usersService.deleteUser(userUuid).subscribe({
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
                    })
                }
            });
    }

    createUser(): void {

    }

    updateUser(user) {
        const config = {
            data: {
                user
            },
        }

    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.usersList.filter = filterValue.trim().toLowerCase();
    }
}
