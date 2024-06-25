import {Component, OnInit, ViewChild} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {AlertsService} from '../../services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {OrderStatuses} from '../../constants/order-statuses';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
    public ordersList: MatTableDataSource<any>;

    public displayedColumns: string[] = [
        'order_number',
        'delivery_date',
        'total',
        'currency',
        'status',
        'action',
    ];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = OrderStatuses;

    constructor(
        private ordersService: OrdersService,
        private spinner: NgxSpinnerService,
        private alertsService: AlertsService,
    ) {
    }

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders() {
        this.spinner.show();
        this.ordersService.getOrders().subscribe({
            next: (res) => {
                this.ordersList = new MatTableDataSource(res.orders);
                this.ordersList.sort = this.sort;
                this.ordersList.paginator = this.paginator;
                this.spinner.hide();
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.ordersList.filter = filterValue.trim().toLowerCase();
    }
}
