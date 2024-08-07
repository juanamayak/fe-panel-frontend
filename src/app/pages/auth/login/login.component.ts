import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsersService } from '../../../services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from '../../../services/alerts.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public loginForm: any;
    public currentYear = moment().format('YYYY');

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    initLoginForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onLogin() {
        this.spinner.show();
        const data = this.loginForm.value;
        this.usersService.login(data).subscribe({
            next: (res) => {
                const token = res.token;
                sessionStorage.setItem(this.usersService.jwtToken, token);
                this.router.navigate(['inicio']);

                this.spinner.hide();
            },
            error: (err) => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            },
        });
    }
}
