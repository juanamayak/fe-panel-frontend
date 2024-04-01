import {Component, OnInit} from '@angular/core';
import {Permissions} from "../../../../constants/permissions";

@Component({
  selector: 'app-manage-permissions-modal',
  templateUrl: './manage-permissions-modal.component.html',
  styleUrl: './manage-permissions-modal.component.css'
})
export class ManagePermissionsModalComponent implements OnInit {

    public  permissions = Permissions;

    ngOnInit(): void {

    }
}
