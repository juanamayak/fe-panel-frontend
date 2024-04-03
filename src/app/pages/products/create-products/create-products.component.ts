import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {CategoriesService} from "../../../services/categories.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertsService} from "../../../services/alerts.service";
import {ProvidersService} from "../../../services/providers.service";
import {ProductsService} from "../../../services/products.service";

interface Image {
    url: string;
    file: File;
    hovered: boolean;
}

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css'
})
export class CreateProductsComponent implements OnInit{

    public productForm: any;

    public categories: any;
    public subcategories: any;
    public providers: any;

    public files: Image[] = [];

    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

    constructor(
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private providersService: ProvidersService,
        private formBuilder: FormBuilder,
        private alertsService: AlertsService,
        private spinner: NgxSpinnerService,
        private location: Location,
    ) {
    }

    ngOnInit(){
        this.getCategories();
    }

    initProductForm(){
        this.productForm = this.formBuilder.group({
            category_id: ['', Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
            discount_percent: [''],
            subcategories: [[], Validators.required],
            providers: [[], Validators.required],
            description: ['', Validators.required]
        });
    }

    createProduct(){
        this.spinner.show();
        const providers = this._providers.value.map(provider => provider.id);
        const subcategories = this._subcategories.value.map(subcategory => subcategory.id);
        const data = {
            category_id: this.productForm.value.category_id,
            description: this.productForm.value.description,
            discount_percent: this.productForm.value.discount_percent,
            name: this.productForm.value.name,
            price: this.productForm.value.price,
            providers: providers,
            subcategories: subcategories
        };
        this.productsService.createProducts(data).subscribe({
            next: res => {
                this.spinner.hide();
                this.alertsService.successAlert(res.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        })
    }

    getCategories() {
        this.spinner.show();
        this.categoriesService.getCategories().subscribe({
            next: res => {
                console.log(res.categories);
                this.categories = res.categories;
                this.getProviders();
            },
            error: err => {
                this.spinner.hide()
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getProviders() {
        this.providersService.gerProviders().subscribe({
            next: res => {
                this.providers = res.providers;
                this.initProductForm();
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getSubcategories(event){
        const categoryId = event.value;
        const category = this.categories.find(cat => cat.id === categoryId);
        this.subcategories = category.subcategories;
    }

    onFileSelected(event: any) {
        const files: File[] = Array.from(event.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.files.push({ url: reader.result as string, file, hovered: false });
            };
        });
    }

    deleteImage(image: Image) {
        const index = this.files.indexOf(image);
        if (index !== -1) {
            this.files.splice(index, 1);
        }
    }

    goBack(){
        this.location.back();
    }

    get _subcategories() {
        return this.productForm.get("subcategories");
    }

    get _providers() {
        return this.productForm.get("providers");
    }
}
