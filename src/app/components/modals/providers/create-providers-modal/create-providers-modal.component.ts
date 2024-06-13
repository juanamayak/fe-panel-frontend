import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../../services/categories.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationsService } from '../../../../services/locations.service';
import { ProvidersService } from '../../../../services/providers.service';

@Component({
    selector: 'app-create-providers-modal',
    templateUrl: './create-providers-modal.component.html',
    styleUrl: './create-providers-modal.component.css',
})
export class CreateProvidersModalComponent implements OnInit {
    public providersForm: any;

    public countries: any;
    public states: any;
    public cities: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private providersService: ProvidersService,
        private locationsService: LocationsService,
        public dialogRef: MatDialogRef<CreateProvidersModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.getCountries();
        this.initForm();
    }

    initForm() {
        this.providersForm = this.formBuilder.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            country_id: ['', Validators.required],
            state_id: ['', Validators.required],
            city_id: ['', Validators.required],
            colony: ['', Validators.required],
            zip: ['', Validators.required],
            responsable_name: ['', Validators.required],
            responsable_lastname: ['', Validators.required],
            responsable_email: ['', Validators.required],
            responsable_cellphone: ['', Validators.required],
        });
    }

    createProvider() {
        this.spinner.show();
        const data = this.providersForm.value;
        this.providersService.createProviders(data).subscribe({
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

    getCountries() {
        this.spinner.show();
        this.locationsService.getCountries().subscribe({
            next: (res) => {
                this.spinner.hide();
                this.countries = res.countries;
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    getStates(event) {
        const countryId = event.value;
        this.locationsService.getStates(countryId).subscribe({
            next: (res) => {
                this.spinner.hide();
                this.states = res.states;
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }

    getCities(event) {
        const stateId = event.value;
        this.locationsService.getCities(stateId).subscribe({
            next: (res) => {
                this.spinner.hide();
                this.cities = res.cities;
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }
}
