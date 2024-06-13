import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
import { FooterComponent } from '../components/shared/footer/footer.component';
import { BaseComponent } from './main-layout/base.component';

@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        BaseComponent,
    ],
    imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
})
export class LayoutsModule {}
