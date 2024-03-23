import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsersService} from "../../../services/users.service";
import {AlertsService} from "../../../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SubcategoryStatuses} from "../../../constants/subcategory-statuses";
import {
    CreateCategoriesModalComponent
} from "../../../components/modals/categories/create-categories-modal/create-categories-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {
    CreateSubcategoriesModalComponent
} from "../../../components/modals/subcategories/create-subcategories-modal/create-subcategories-modal.component";

@Component({
    selector: 'app-subcategories',
    templateUrl: './subcategories.component.html',
    styleUrl: './subcategories.component.css'
})
export class SubcategoriesComponent implements OnInit {

    @Input() category: any;
    @Output() subcategoryEmmiter = new EventEmitter<string>();

    public subcategoriesList: MatTableDataSource<any>;

    public displayedColumns: string[] = ['name', 'status', 'action'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public statuses = SubcategoryStatuses;

    constructor(
        private usersService: UsersService,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.subcategoriesList = new MatTableDataSource(this.category.subcategories);
        this.subcategoriesList.sort = this.sort;
        this.subcategoriesList.paginator = this.paginator;
    }

    openDialog(): void {
        const data = {
            data: {
                category: this.category
            }
        }
        const dialogRef = this.dialog.open(CreateSubcategoriesModalComponent, data);

        dialogRef.afterClosed().subscribe(result => {
            if (result){
                this.subcategoryEmmiter.emit(result);
            }
        });
    }
}
