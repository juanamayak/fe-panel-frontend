import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {UserRoles} from "../../constants/user-roles";
import {CouponStatuses} from "../../constants/coupon-statuses";
import {UsersService} from "../../services/users.service";
import {AlertsService} from "../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserModalComponent} from "../../components/modals/users/create-user-modal/create-user-modal.component";
import {
    CreateCouponsModalComponent
} from "../../components/modals/coupons/create-coupons-modal/create-coupons-modal.component";

@Component({
    selector: 'app-coupons',
    templateUrl: './coupons.component.html',
    styleUrl: './coupons.component.css'
})
export class CouponsComponent implements OnInit{

    public couponsList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['coupon', 'quantity', 'discount_percent', 'expiration', 'status', 'createdAt'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = CouponStatuses;

    constructor(
        private usersService: UsersService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        // this.getUsers();
    }

    openCreateCouponsDialog(): void {
        const dialogRef = this.dialog.open(CreateCouponsModalComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result){
                // this.getUsers();
            }
        });
    }

}
