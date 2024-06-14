import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { AlertsService } from '../../../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CouponsService } from '../../../../services/coupons.service';
import * as moment from 'moment';

@Component({
    selector: 'app-create-coupons-modal',
    templateUrl: './create-coupons-modal.component.html',
    styleUrl: './create-coupons-modal.component.css',
})
export class CreateCouponsModalComponent implements OnInit {
    public couponsForm: any;

    public minDate = moment().format();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private couponsService: CouponsService,
        public dialogRef: MatDialogRef<CreateCouponsModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.couponsForm = this.formBuilder.group({
            coupon: ['', Validators.required],
            quantity: ['', Validators.required],
            discount_percent: ['', Validators.required],
            expiration: ['', Validators.required],
        });
    }

    createCoupon() {
        this.spinner.show();
        const data = this.couponsForm.value;

        this.couponsService.createCoupons(data).subscribe({
            next: (res) => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                setTimeout(() => {
                    this.dialogRef.close(true);
                }, 2500);
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
