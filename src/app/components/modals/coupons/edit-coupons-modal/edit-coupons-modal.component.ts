import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CouponsService} from "../../../../services/coupons.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertsService} from "../../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import * as moment from "moment/moment";

@Component({
    selector: 'app-edit-coupons-modal',
    templateUrl: './edit-coupons-modal.component.html',
    styleUrl: './edit-coupons-modal.component.css'
})
export class EditCouponsModalComponent implements OnInit {
    public couponsForm: any;

    public minDate = moment().format();

    public coupon: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private couponsService: CouponsService,
        public dialogRef: MatDialogRef<EditCouponsModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.coupon = this.data.coupon;
        this.initForm();
    }

    initForm() {
        this.couponsForm = this.formBuilder.group({
            coupon: [this.coupon.coupon, Validators.required],
            quantity: [this.coupon.quantity.toString(), Validators.required],
            discount_percent: [this.coupon.discount_percent.toString(), Validators.required],
            expiration: [this.coupon.expiration, Validators.required]
        });
    }

    updateCoupon(){
        this.spinner.show();
        const data = this.couponsForm.value;
        this.couponsService.updateCoupons(this.coupon.uuid, data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                setTimeout(() => {
                    this.dialogRef.close(true);
                }, 2500);
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
