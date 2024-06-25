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
import {CategoriesService} from '../../../../services/categories.service';
import {AlertsService} from '../../../../services/alerts.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UsersService} from '../../../../services/users.service';
import {UserRoles} from "../../../../constants/user-roles";

@Component({
    selector: 'app-create-user-modal',
    templateUrl: './create-user-modal.component.html',
    styleUrl: './create-user-modal.component.css',
})
export class CreateUserModalComponent implements OnInit {
    public usersForm: any;
    public roles = UserRoles;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private usersService: UsersService,
        public dialogRef: MatDialogRef<CreateUserModalComponent>,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.usersForm = this.formBuilder.group({
            role_id: ['', Validators.required],
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    createUser() {
        this.spinner.show();
        const data = this.usersForm.value;
        this.usersService.createUsers(data).subscribe({
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
