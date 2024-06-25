import {Component, Inject, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {UsersService} from '../../../../services/users.service';
import {AlertsService} from '../../../../services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserRoles} from "../../../../constants/user-roles";

@Component({
    selector: 'app-edit-users-modal',
    templateUrl: './edit-users-modal.component.html',
    styleUrl: './edit-users-modal.component.css',
})
export class EditUsersModalComponent implements OnInit {
    public usersForm: any;
    public passwordForm: any;

    public user: any;
    public hide = true;

    public roles = UserRoles;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private usersService: UsersService,
        public dialogRef: MatDialogRef<EditUsersModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.user = this.data.user;
        this.initForms();
    }

    initForms() {
        this.usersForm = this.formBuilder.group({
            role_id: [this.user.role_id, Validators.required],
            name: [this.user.name, Validators.required],
            lastname: [this.user.lastname, Validators.required],
            email: [this.user.email, Validators.required],
        });

        this.passwordForm = this.formBuilder.group({
            password: ['', Validators.required],
            confirm_password: ['', Validators.required],
        });
    }

    updateUser() {
        this.spinner.show();
        const data = this.usersForm.value;
        this.usersService.updateUsers(this.user.uuid, data).subscribe({
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

    showPassword() {
        this.hide = !this.hide;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
