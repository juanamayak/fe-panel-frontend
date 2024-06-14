import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    public menuItems: any;
    public menu: any;

    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit(): void {
        this.setMenuItem();
    }

    setMenuItem() {
        this.menuItems = ROUTES.filter((menuItem) => menuItem);

        const groups = new Set(this.menuItems.map((item: any) => item.group));

        this.menu = [];
        groups.forEach((g) =>
            this.menu.push({
                name: g,
                values: this.menuItems.filter((i: any) => i.group === g),
                module: '',
            }),
        );

        for (let i = 0; i < this.menu.length; i++) {
            for (let j = 0; j < this.menu[i].values.length; j++) {
                this.menu[i].module = this.menu[i].values[j].module;
            }
        }
    }
}

// Rutas que se mostrarán en el sidebar menu
export const ROUTES = [
    {
        path: '/inicio',
        group: 'PANEL',
        module: 'home',
        action: 'view',
        title: 'Inicio',
        icon: 'fa-house',
        class: '',
        role: [null],
    },
    {
        path: '/pedidos',
        group: 'PANEL',
        module: 'users',
        action: 'list',
        title: 'Pedidos',
        icon: 'fa-truck-ramp-box',
        class: '',
        role: [null],
    },
    {
        path: '/clientes',
        group: 'PANEL',
        module: 'users',
        action: 'list',
        title: 'Clientes',
        icon: 'fa-users',
        class: '',
        role: [null],
    },
    {
        path: '/productos',
        group: 'PRODUCTOS',
        module: 'users',
        action: 'list',
        title: 'Productos',
        icon: 'fa-boxes-stacked',
        class: '',
        role: [null],
    },
    {
        path: '/categorias',
        group: 'PRODUCTOS',
        module: 'users',
        action: 'list',
        title: 'Categorias',
        icon: 'fa-list',
        class: '',
        role: [null],
    },
    {
        path: '/florerias',
        group: 'PROVEEDORES',
        module: 'users',
        action: 'list',
        title: 'Florerias',
        icon: 'fa-store',
        class: '',
        role: [null],
    },
    {
        path: '/cupones',
        group: 'CONFIGURACIÓN',
        module: 'users',
        action: 'list',
        title: 'Cupones',
        icon: 'fa-ticket',
        class: '',
        role: [null],
    } /*
    {
        path: '/horarios',
        group: 'CONFIGURACIÓN',
        module: 'users',
        action: 'list',
        title: 'Horarios de entrega',
        icon: 'fa-clock',
        class: '',
        role: [null]
    },*/,
    {
        path: '/dedicatorias',
        group: 'CONFIGURACIÓN',
        module: 'users',
        action: 'list',
        title: 'Dedicatorias',
        icon: 'fa-comment',
        class: '',
        role: [null],
    } /*
    {
        path: '/idiomas',
        group: 'CONFIGURACIÓN',
        module: 'users',
        action: 'list',
        title: 'Idiomas',
        icon: 'fa-globe',
        class: '',
        role: [null]
    },*/,
    {
        path: '/usuarios',
        group: 'CONFIGURACIÓN',
        module: 'users',
        action: 'list',
        title: 'Usuarios',
        icon: 'fa-user-gear',
        class: '',
        role: [null],
    },
    /*{
        path: '/roles',
        group: 'CONFIGURACIÓN',
        module: 'users',
        action: 'list',
        title: 'Roles',
        icon: 'fa-shield-halved',
        class: '',
        role: [null]
    }*/
];
