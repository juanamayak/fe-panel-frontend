import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {UserRoles} from '../../constants/user-roles';
import {CouponStatuses} from '../../constants/coupon-statuses';
import {UsersService} from '../../services/users.service';
import {AlertsService} from '../../services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog} from '@angular/material/dialog';
import {CreateUserModalComponent} from '../../components/modals/users/create-user-modal/create-user-modal.component';
import {
    CreateCouponsModalComponent
} from '../../components/modals/coupons/create-coupons-modal/create-coupons-modal.component';
import {CouponsService} from '../../services/coupons.service';
import {EditUsersModalComponent} from '../../components/modals/users/edit-users-modal/edit-users-modal.component';
import {
    EditCouponsModalComponent
} from '../../components/modals/coupons/edit-coupons-modal/edit-coupons-modal.component';

@Component({
    selector: 'app-coupons',
    templateUrl: './coupons.component.html',
    styleUrl: './coupons.component.css',
})
export class CouponsComponent implements OnInit {
    public couponsList: MatTableDataSource<any>;

    public displayedColumns: string[] = [
        'coupon',
        'quantity',
        'discount_percent',
        'expiration',
        'status',
        'active',
        'createdAt',
        'action',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = CouponStatuses;

    constructor(
        private couponsService: CouponsService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.getCoupons();
    }

    getCoupons() {
        this.spinner.show();
        this.couponsService.getCoupons().subscribe({
            next: (res) => {
                this.couponsList = new MatTableDataSource(res.coupons);
                this.couponsList.sort = this.sort;
                this.couponsList.paginator = this.paginator;
                this.spinner.hide();
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    openCreateCouponsDialog(): void {
        const dialogRef = this.dialog.open(CreateCouponsModalComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getCoupons();
            }
        });
    }

    openEditCouponsDialog(coupon): void {
        const config = {
            data: {
                coupon,
            },
        };
        const dialogRef = this.dialog.open(EditCouponsModalComponent, config);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.getCoupons();
            }
        });
    }

    updateStatus(couponUuid, status) {
        this.spinner.show();
        const data = {status: status ? 1 : 0};
        this.couponsService.updateStatus(couponUuid, data).subscribe({
            next: (res) => {
                this.spinner.hide();
                this.alertsService.successAlert((res as any).message);
                setTimeout(() => {
                    this.getCoupons();
                }, 2500);
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    deleteCoupon(couponUuid) {
        this.alertsService
            .confirmDelete(`¿Estás seguro de eliminar este cupón?`)
            .then((res) => {
                if (res.isConfirmed) {
                    this.spinner.show();
                    this.couponsService.deleteCoupon(couponUuid).subscribe({
                        next: (res) => {
                            this.spinner.hide();
                            this.alertsService.successAlert(res.message);
                            setTimeout(() => {
                                this.getCoupons();
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.couponsList.filter = filterValue.trim().toLowerCase();
    }
}
