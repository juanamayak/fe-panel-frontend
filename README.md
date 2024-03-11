# Plantilla base para desarrollo de proyectos con Angular 17

Dicho desarrollo esta planificado para ser un modelo a seguir para los proyectos futuros, en los cuales necesitemos que el frontend este escrito con el framework angular

### Pre-requisitos 📋

* Angular 17
* Angular Material 17
* SweetAlert2 11
* Ngx Spinner 16
* Signature Pad 4.0
* FontAwesome 6.2

## Comenzando 🚀

1. Descarga o clona el proyecto de la rama principal
2. Instala las dependencias: `npm install`
3. Asegurate que las varibles del enviroment.ts esten apuntando a tu localhost
   
```
export const environment = {
  production: false,
  url: 'http://localhost:0000/api', // URL BACKEND
  app_name: 'Test App',
  base_url: 'http://localhost:4200',
  apiKey: 'ABlBUABemCfFkGGF1vuaMe9M0Jnb3c2quXFFN-gqM7-jU7EPeyJhcHBfbmFtZSI6ImJhY2tfbGFyYXZlbF90ZXN0IiwiaWQiOjF9'
};
```
     

## Estructura del proyecto 🛠️

La estructura cumple con las normativas de Angular, puedes consultar la documentación oficial en el siguiente link [Angular Framework](https://angular.io/). Se recomienda seguir la estructura del framework, a continuación se en-listaran las carpetas personalizadas y su función:

* app\common: Aquí encontraremos los componentes reutilizables tales como: footer, navbar, sidebar, formas, listados etc.
* app\directives: Aquí se ubican las directivas personalizadas tales como:
* *  appBtnPermissionScope: Directiva que identifica si el boton sera visible o no dependiendo de las acciones por permisos del usuario.
* *  appPermissionModule: Directiva para verificar si un elemento puede ser visible o no dependiendo de los permisos del usuario.
* app\Enums: Aquí encontramos las clases que manejan las enumeraciones
* app\Guards: Aquí se colocaran todas las clases que utilizaremos para manejar guardias personalizadas, (ej. AuthGuard)
* app\Helpers: Carpeta para almacenar los helpers que utilicemos en el proyecto
* app\interceptors: Helper interceptor de peticiones, funciona para inyectar las cabeceras requeridas en el backend
* app\Models: Conjunto de interfaces de los objetos involucrados en la aplicación
* app\Modules: Conjunto de módulos que engloban cada aspecto de la aplicación, cada uno de ellos debe incluir sus propios componentes
* app\Services: Conjunto servicios que hacen peticiones al backend.
* Las demás carpetas y archivos que no se mencionaron puedes consultar la documentación oficial de angular para ver su uso y configuración.

## Estructura de directorios de los estilos del proyecto
Los estilos globales estan ubicados en: src/styles

El proyecto contiene la siguiente estructura:
* Directorio Abstracts: Aqui colocas variables, functions, mixins, placeholders.
* Directorio Base: Aqui se coloca tipografias, iconos normalize, estilos para resetear etc.
* Directorio Layout: Colocas, estilos para: body, navagation, grid system, header, footer, sidebar, forms etc.
* Directorio Vendors: Colocas archivos de frameworks o paquetes que no hayas realizado tu pero que son parte del proyecto ej. bootstrap, jquery, etc)
* Directorio Themes: Aqui se carga la configuración de estilos, colores, tipografia que en conjunto con las directivas de angular material definimos el aspecto de la aplicación.
** El archivo main.scss es el que carga todas los estilos de los directorios antes mencionados, dentro de main.scss tambien encontraremos estilos globales segmentados por regiones que afectan a ciertos componentes.
** Cabe resaltar que cada componente de angular puede tener sus propios estilos, pero si se considera que esos estilos pueden ser aplicados en otro lugar, es mejor colocarlos en el directorio layout de acuerdo a su categoría.

## Como cambiar entre plantilla de acuerdo a la empresa
Este proyecto contiene dos tipos de tema: vtw y flyback.
Basta con abrir el archivo: _loaded-theme.scss y descomentar el tema a utilizar y comentar el otro
La ubicacion de este archivo esta en: src/styles/themes/_loaded-theme.scss

Tambien hay que considerar al archivo index.html, comentar y descomentar la línea correspondiete del favicon a mostrar.


## Versionado 📌

Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/GC-Sistemas/gs-frontend_angular-plantilla/tags).

## Autores ✒️

_Equipo de desarrolladores web GUSA_

## Licencia 📄

Este proyecto está bajo la Licencia MIT

## Expresiones de Gratitud 🎁

* Invita una cerveza 🍺 o un café ☕ a alguien del equipo.
