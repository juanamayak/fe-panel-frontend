import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProvidersService } from '../../../../services/providers.service';
import { LocationsService } from '../../../../services/locations.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../../services/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-edit-providers-modal',
    templateUrl: './edit-providers-modal.component.html',
    styleUrl: './edit-providers-modal.component.css',
})
export class EditProvidersModalComponent implements OnInit {
    public providersForm: any;

    public provider: any;

    public countries: any;
    public states: any;
    public cities: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private providersService: ProvidersService,
        private locationsService: LocationsService,
        public dialogRef: MatDialogRef<EditProvidersModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {}

    ngOnInit(): void {
        this.provider = this.data.provider;
        this.getCountries();
        this.getStates({ value: this.provider.country_id });
        this.getCities({ value: this.provider.state_id });
    }

    initForm() {
        this.providersForm = this.formBuilder.group({
            name: [this.provider.name, Validators.required],
            address: [this.provider.address, Validators.required],
            country_id: [this.provider.country_id, Validators.required],
            state_id: [this.provider.state_id, Validators.required],
            city_id: [this.provider.city_id, Validators.required],
            colony: [this.provider.colony, Validators.required],
            zip: [this.provider.zip, Validators.required],
            responsable_name: [
                this.provider.responsable_name,
                Validators.required,
            ],
            responsable_lastname: [
                this.provider.responsable_lastname,
                Validators.required,
            ],
            responsable_email: [
                this.provider.responsable_email,
                Validators.required,
            ],
            responsable_cellphone: [
                this.provider.responsable_cellphone,
                Validators.required,
            ],
        });
    }

    editProvider() {
        this.spinner.show();
        const data = this.providersForm.value;
        this.providersService
            .updateProviders(this.provider.uuid, data)
            .subscribe({
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
                this.initForm();
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }
}
