export const Permissions = [
    {
        module: 'orders',
        permissions: [
            { action: 'list' },
        ]
    },
    {
        module: 'clients',
        permissions: [
            { action: 'list' },
        ]
    },
    {
        module: 'products',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
        module: 'categories',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'delete' },
        ]
    },
    {
        module: 'providers',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
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
        module: 'messages',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
        module: 'users',
        permissions: [
            { action: 'list' },
            { action: 'create' },
            { action: 'edit' },
            { action: 'delete' },
        ]
    },
    {
        module: 'roles',
        permissions: [
            { action: 'list' }
        ]
    },
]
