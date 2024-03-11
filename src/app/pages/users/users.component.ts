import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {UserRoles} from "../../constants/roles";
import {UsersService} from "../../services/users.service";

export interface PeriodicElement {
    full_name: string;
    email: string;
    status: number;
    created: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {full_name: 'Juan Enrique Amaya', email: 'test@email.com', status: 1, created: new Date()},
    {full_name: 'Luis Daniel Solano', email: 'test@email.com', status: 1, created: new Date()},
    {full_name: 'Omar Alejandro Gonzalez', email: 'test@email.com', status: 1, created: new Date()},
    {full_name: 'Jorge Esau Mejia Torres', email: 'test@email.com', status: 1, created: new Date()},
    {full_name: 'Jhon Doe Slim', email: 'test@email.com', status: 0, created: new Date()},
    {full_name: 'Pancho Lopez Gonzalez', email: 'test@email.com', status: 0, created: new Date()},
    {full_name: 'Daniel Cosito Peraza', email: 'test@email.com', status: 1, created: new Date()},
];

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['full_name', 'email', 'status', 'action'];
    dataSource = ELEMENT_DATA;

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
        // IMPLEMENTAR PETICIÓN DE USUARIOS
        /*this.spinner.show();
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
        });*/
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
