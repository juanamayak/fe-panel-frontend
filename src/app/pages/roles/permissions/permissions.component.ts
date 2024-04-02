import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {Permissions} from "src/app/constants/permissions";
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit{

    public permissionsForm: any;

    public  permissions = Permissions;

    constructor(
        private formBuilder: FormBuilder,
        private location: Location,
    ) {
    }

    ngOnInit(){
        // this.initPermissionsForm();
    }

    initPermissionsForm(){
        this.permissionsForm = this.formBuilder.group({
            permisos: this.formBuilder.array([])
        });

        this.permissions.forEach(group => {
            const groupPermissions = this.formBuilder.array(
                group.permissions.map(permission => this.formBuilder.group({
                    action: [false]
                }))
            );
            (this.permissionsForm.get('permisos') as FormArray).push(this.formBuilder.group({
                name: group.name,
                permissions: groupPermissions
            }));
        });
    }

    goBack(){
        this.location.back();
    }

}
