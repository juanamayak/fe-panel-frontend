import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {UserRoles} from "../../constants/roles";
import {UsersService} from "../../services/users.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

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

    constructor(
        private usersService: UsersService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(){
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


    deleteUser(user){
        this.alertsService.confirmDelete(`¿Estás seguro de eliminar este usuario?`)
            .then((res) => {
                if (res.isConfirmed) {
                    // PETICIÓN PARA ELIMINAR USUARIO
                    /*this.spinner.show();
                    this.usersService.deleteUser(user.uuid).subscribe({
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
            });
    }
    createUser(): void {

    }

    updateUser(user){
        const config = {
            data: {
                user
            },
        }

    }

    /*applyFilter(event: Event) {
        constants filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }*/
}
