import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DedicationsService} from "../../../../services/dedications.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertsService} from "../../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-edit-dedications-modal',
  templateUrl: './edit-dedications-modal.component.html',
  styleUrl: './edit-dedications-modal.component.css'
})
export class EditDedicationsModalComponent implements OnInit {
    public dedicationsForm: any;

    public dedication: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dedicationsService: DedicationsService,
        public dialogRef: MatDialogRef<EditDedicationsModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.dedication = this.data.dedication;
        this.initForm();
    }

    initForm(){
        this.dedicationsForm = this.formBuilder.group({
            title: [this.dedication.title, Validators.required],
            message: [this.dedication.message, Validators.required]
        });
    }

    updateDedication(){
        this.spinner.show();
        const data = this.dedicationsForm.value;
        this.dedicationsService.updateDedications(this.dedication.uuid, data).subscribe({
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
