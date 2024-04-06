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
}

@Component({
    selector: 'app-create-products',
    templateUrl: './create-products.component.html',
    styleUrl: './create-products.component.css'
})
export class CreateProductsComponent implements OnInit {

    public productForm: any;

    public categories: any;
    public subcategories: any;
    public providers: any;

    public files: Image[] = [];

    public discountSelect: boolean = false;

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

    ngOnInit() {
        this.getCategories();
    }

    initProductForm() {
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

    createProduct() {
        this.spinner.show();
        const product = this.productForm.value;

        const formData: FormData = new FormData();
        formData.append('category_id', product.category_id);
        formData.append('description', product.description);
        formData.append('discount_percent', product.discount_percent);
        formData.append('name', product.name);
        formData.append('price', product.price);

        for (const provider of product.providers) {
            formData.append('providers', provider.id);
        }

        for (const subcategory of product.subcategories) {
            formData.append('subcategories', subcategory.id);
        }

        for (const file of this.files) {
            formData.append('images', file.file);
        }

        this.productsService.createProducts(formData).subscribe({
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

    getSubcategories(event) {
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
                this.files.push({url: reader.result as string, file});
            };
        });
    }

    deleteImage(image: Image) {
        const index = this.files.indexOf(image);
        if (index !== -1) {
            this.files.splice(index, 1);
        }
    }

    showDiscountSelect(event) {
        if (event.checked) {
            this.discountSelect = true;
        } else {
            this.discount_percent.setValue('');
            this.discountSelect = false;
        }
    }

    goBack() {
        this.location.back();
    }

    get discount_percent(){
        return this.productForm.get('discount_percent');
    }

    get _subcategories() {
        return this.productForm.get("subcategories");
    }

    get _providers() {
        return this.productForm.get("providers");
    }
}
