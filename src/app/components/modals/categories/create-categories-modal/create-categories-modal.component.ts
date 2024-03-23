import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertsService} from "../../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CategoriesService} from "../../../../services/categories.service";

@Component({
  selector: 'app-create-categories-modal',
  templateUrl: './create-categories-modal.component.html',
  styleUrl: './create-categories-modal.component.css'
})
export class CreateCategoriesModalComponent implements OnInit{

    public categoriesForm: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private categoriesService: CategoriesService,
        public dialogRef: MatDialogRef<CreateCategoriesModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
        this.categoriesForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    createCategory(){
        this.spinner.show();
        const data = this.categoriesForm.value;
        this.categoriesService.createCategories(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert((res as any).message);
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
