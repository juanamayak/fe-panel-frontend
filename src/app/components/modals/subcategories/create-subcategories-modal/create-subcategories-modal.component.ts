import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../../services/categories.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubcategoriesService } from '../../../../services/subcategories.service';

@Component({
    selector: 'app-create-subcategories-modal',
    templateUrl: './create-subcategories-modal.component.html',
    styleUrl: './create-subcategories-modal.component.css',
})
export class CreateSubcategoriesModalComponent implements OnInit {
    public subcategoriesForm: any;
    public category_id: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private subcategoriesService: SubcategoriesService,
        public dialogRef: MatDialogRef<CreateSubcategoriesModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.category_id = this.data.category.id;
        this.initForm();
    }

    initForm() {
        this.subcategoriesForm = this.formBuilder.group({
            category_id: this.category_id.toString(),
            name: ['', Validators.required],
        });
    }

    createCategory() {
        this.spinner.show();
        const data = this.subcategoriesForm.value;
        this.subcategoriesService.createSubcategories(data).subscribe({
            next: (res) => {
                this.spinner.hide();
                this.alertsService.successAlert((res as any).message);
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
}
