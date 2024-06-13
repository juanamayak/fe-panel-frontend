import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../../services/categories.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DedicationsService } from '../../../../services/dedications.service';

@Component({
    selector: 'app-create-dedications-modal',
    templateUrl: './create-dedications-modal.component.html',
    styleUrl: './create-dedications-modal.component.css',
})
export class CreateDedicationsModalComponent implements OnInit {
    public dedicationsForm: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dedicationsService: DedicationsService,
        public dialogRef: MatDialogRef<CreateDedicationsModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.dedicationsForm = this.formBuilder.group({
            title: ['', Validators.required],
            message: ['', Validators.required],
        });
    }

    createDedication() {
        this.spinner.show();
        const data = this.dedicationsForm.value;
        this.dedicationsService.createDedications(data).subscribe({
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
