import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Location} from "@angular/common";

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
export class CreateProductsComponent {

    public files: Image[] = [];

    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

    constructor(
        private formBuilder: FormBuilder,
        private location: Location,
    ) {
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

        console.log(this.files.length);
    }

    deleteImage(image: Image) {
        console.log(image)
        const index = this.files.indexOf(image);
        if (index !== -1) {
            this.files.splice(index, 1);
        }
    }

    goBack(){
        this.location.back();
    }
}
