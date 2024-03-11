import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as moment from "moment";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: any;
    public currentYear = moment().format('YYYY');

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.initLoginForm();
    }

    initLoginForm(){
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin(){
        const data = this.loginForm.value;
        this.router.navigate(['home']);
    }
}
