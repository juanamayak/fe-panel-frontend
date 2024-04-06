import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {Location} from "@angular/common";
import {ProductsService} from "../../../services/products.service";
import {CategoriesService} from "../../../services/categories.service";
import {ProvidersService} from "../../../services/providers.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute} from "@angular/router";

interface Image {
    url: string;
    file: File;
}

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

    public productForm: any;

    public product: any;

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
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getProduct();
    }

    getProduct(){
        this.activatedRoute.params.subscribe((params) => {
            if (params) {
                this.spinner.show();
                const productUuid = params['uuid'];
                this.productsService.getProduct(productUuid).subscribe({
                    next: res => {
                        this.product = res.product;
                        this.getCategories();
                    },
                    error: err => {
                        this.spinner.hide()
                        this.alertsService.errorAlert(err.error.errors);
                    }
                });
            }
        });
    }

    initProductForm() {
        const providers = this.product.providers.map(provider => provider.id);
        const subcategories = this.product.subcategories.map(subcategory => subcategory.id);

        this.productForm = this.formBuilder.group({
            category_id: [this.product.category_id, Validators.required],
            name: [this.product.name, Validators.required],
            price: [this.product.price, Validators.required],
            discount_percent: [this.product.discount_percent],
            subcategories: [subcategories, Validators.required],
            providers: [providers, Validators.required],
            description: [this.product.description, Validators.required]
        });

        this.getSubcategories({value: this.product.category_id});

        if (this.product.discount_percent){
            this.discountSelect = true;
        }
    }

    createProduct() {
        this.spinner.show();
        const product = this.productForm.value;
        const providers = this._providers.value.map(provider => provider.id);
        const subcategories = this._subcategories.value.map(subcategory => subcategory.id);


        const formData: FormData = new FormData();
        formData.append('category_id', product.category_id);
        formData.append('description', product.description);
        formData.append('discount_percent', product.discount_percent);
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('providers', providers);
        formData.append('subcategories', subcategories);

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
                this.getImages();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        });
    }

    getImages(){
        this.productsService.getProductImages(this.product.uuid).subscribe({
            next: res => {
                console.log(res);
                this.initProductForm();
                this.spinner.hide();
            },
            error: err => {
                this.spinner.hide();
                this.alertsService.errorAlert(err.error.errors);
            }
        })
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

        console.log(this.files);
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