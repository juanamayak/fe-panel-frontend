import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CurrencyPipe, DatePipe, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AlertsService} from '../../../services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {OrdersService} from '../../../services/orders.service';
import {OrderStatuses} from '../../../constants/order-statuses';
import {PaymentService} from "../../../services/payment.service";
import * as mapboxgl from "mapbox-gl";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.css',
})
export class OrderDetailComponent implements OnInit {
    public order: any;
    public payment: any;

    public statuses = OrderStatuses;

    public map: mapboxgl.Map;
    public style = `mapbox://styles/mapbox/streets-v12`;
    public zoom = 15;

    constructor(
        private ordersService: OrdersService,
        private paymentService: PaymentService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
    ) {
    }

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
                        this.order = res.order;
                        this.getPaymentByOrder();
                        this.initMap();
                    },
                    error: (err) => {
                        this.spinner.hide();
                        this.alertsService.errorAlert(err.error.errors);
                    },
                });
            }
        });
    }

    getPaymentByOrder() {
        this.paymentService.getPaymentByOrder(this.order.id).subscribe({
            next: res => {
                this.spinner.hide();
                this.payment = res.payment;
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    initMap() {
        if (this.map) {
            this.map.remove();
        }

        this.map = new mapboxgl.Map({
            accessToken: environment.mapboxToken,
            container: 'map',
            style: this.style,
            zoom: this.zoom,
            center: [this.order.addresses.longitude, this.order.addresses.latitude]
        });

        this.map.addControl(new mapboxgl.NavigationControl());
        this.buildMarker(this.order.addresses.longitude, this.order.addresses.latitude)
    }

    buildMarker(lng: any, lat: any) {
        const marker = new mapboxgl.Marker({
            draggable: false
        }).setLngLat([lng, lat]).addTo(this.map);

        /* marker.on('dragend', () => {
             this.longitude.setValue(marker.getLngLat().lng);
             this.latitude.setValue(marker.getLngLat().lat);
         });*/
    }

    goBack() {
        this.location.back();
    }

}
