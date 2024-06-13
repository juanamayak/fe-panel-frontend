import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersService } from '../../../services/orders.service';
import { OrderStatuses } from '../../../constants/order-statuses';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
    public order: any;

    public statuses = OrderStatuses;

    constructor(
        private ordersService: OrdersService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
    ) {}

    ngOnInit() {
        this.getOrder();
    }

    getOrder() {
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const orderUuid = params['uuid'];
                this.ordersService.getOrder(orderUuid).subscribe({
                    next: (res) => {
                        this.spinner.hide();
                        this.order = res.order;
                    },
                    error: (err) => {
                        this.spinner.hide();
                        this.alertsService.errorAlert(err.error.errors);
                    },
                });
            }
        });
    }

    goBack() {
        this.location.back();
    }
}
