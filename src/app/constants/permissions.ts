export const Permissions = [
    {
        name: 'Productos',
        module: 'products',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
        name: 'Categorias',
        module: 'categories',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'delete' },
        ]
    },
    {
        name: 'Proveedores',
        module: 'providers',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
        name: 'Cupones',
        module: 'cupones',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'status' },
            { action: 'delete' },
        ]
    },
    {
        name: 'Mensajes',
        module: 'messages',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
        name: 'Ordenes',
        module: 'orders',
        permissions: [
            { action: 'list' },
        ]
    },
    {
        name: 'Clientes',
        module: 'clients',
        permissions: [
            { action: 'list' },
        ]
    },


    {
        name: 'Usuarios',
        module: 'users',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
        name: 'Roles',
        module: 'roles',
        permissions: [
            { action: 'list' }
        ]
    },
]
