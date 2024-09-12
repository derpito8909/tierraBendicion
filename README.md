<h1 align="center">
    <img src="https://i.ibb.co/w0Ft3XJ/fullLogo.png" alt="fullLogo" border="0" width="220px" heigth="220px">
</h1>

<p align="center">
  <i align="center">Proyecto Interno tierra de bendicion 🚀</i>
</p>

<h4 align="center">
  <a href="https://img.shields.io/badge/-angular-grey?style=for-the-badge&logo=angular&logoColor=white&labelColor=8E2DE2">
    <img src="https://img.shields.io/badge/-angular-grey?style=for-the-badge&logo=angular&logoColor=white&labelColor=8E2DE2" alt="angular" style="height: 20px;">
  </a>
  <a href="https://img.shields.io/badge/-node-grey?style=for-the-badge&logo=node.js&logoColor=white&labelColor=8E2DE2">
    <img src="https://img.shields.io/badge/-node-grey?style=for-the-badge&logo=node.js&logoColor=white&labelColor=8E2DE2" alt="contributors" style="height: 20px;">
  </a>
  <a href="https://img.shields.io/badge/-mongodb-grey?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=8E2DE2">
    <img src="https://img.shields.io/badge/-mongodb-grey?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=8E2DE2">
  </a>
  <br>
  <a href="https://amplication.com/discord">
    <img src="https://img.shields.io/badge/-express-grey?style=for-the-badge&logo=express&logoColor=white&labelColor=8E2DE2" alt="express" style="height: 20px;">
  </a>
</h4>

<p align="center">
    <img src="https://i.ibb.co/Nn2GB9V/inicio-Sesion.png"" alt="inicio"/>
</p>

## Introducción

`Tierra bendicion web` es un sitio web que nace por la necesidad de que el pastor y su grupo de colaboradores puedan tener una pagina facil y accesible donde este algunas de las labores de registro de informacion que se tiene en la iglesia, donde lugar a que sea una informacion centralizada y visible para sus posteriores estadisticas

<details open>
<summary>
 caracteristicas
</summary> <br />

<p align="center">
    <img width="49%" src="https://i.ibb.co/rpmdFVK/principal.png" alt="principal"/>
&nbsp;
    <img width="49%" src="https://i.ibb.co/kMkDdvW/menu.png" alt="data-models"/>
</p>

<p align="center">
    <img width="49%" src="https://i.ibb.co/wLMb59K/miembro.png" alt="plugins"/>
&nbsp;
    <img width="49%" src="https://i.ibb.co/svfg7B9/curso.png" alt="microservices"/>
</p> 
    
<p align="center">
    <img width="49%" src="https://i.ibb.co/tYg6Tkh/actividad.png" alt="own-your-code"/>
&nbsp;
    
</p>

</details>

## Uso

Esta aplicación a de ser de uso interno todos los servicios que ofrece, el usaurio tiene debe iniciar sesion con un usuario y contraseña que que el administrador le asignará.

el sitio web tendra los siguientes roles:

- Rol administrador = es un usuario con el amyor rango dentro del sitio web, él podra crear los usuario, cambiar de rol a los demas usuario y poder editar informacion y eliminarla a lo que no considere importante

- Rol lider = es un usuario basicamente para poder asignado a una actividad que realizae la iglesia

- Rol Profesor = es un usuario basicamente para poder asignado a un curso que dicte la iglesia

- Rol Servidor = es un usuario basico el cual podra utilizar las sesiones de registrar nuevos miembros, registrar las activiades, y registrar los cursos que se dictarán

Este sitio web tendra los siguientes servicios:

1. Registros de miembros: opcion para registrar los datos personales de las personas que asisten a la iglesia y hacerles el acompañamiento en sus peticiones

2. Registro de actividades: opcion para registrar las actividades que se realizan y las personaes que asistieron para tener una estadistica de las activiades realizadas en la iglesia

3. Educacion cristiana: opcion para crear los cursos que se dictan en la iglesia y tener una estadistica de cuantos cursos se dictaron en un periodo de tiempo.

4. `solo para administradores`: administracion de usuario: opcion para la creacion de los usuarios que utilicen este sitio web y poder cambiar de rol si fuera necesitario

todos los usaurios tendran una seccion de perfil, donde pueden personalizar su nombre y correo electronico el cual utilizaran para iniciar sesion, igualmente podran cambiar la contraseña

## Desarrollo

este sitio web se creo con los componentes del MEAN Stack ( MongoBd, express.js, Angular, Node.js) tambien se utilizaron librerias especiales como Angular material para darles un estilo especial a la aplicacion.

Este proyecto tiene la extructura de aquitectura MVC 

<details open>
<summary>
Pre-requisitos
</summary> <br />
Para ejecutar la aplicacion necesita tener instalado este aplicacion
###

- Node.js
- Angular cli
</details>

<details open>
<summary>
ejecutar la aplicacion
</summary> <br />

para ejecutar la aplicacion:

1. clone el repositorio en angular:

```shell
git clone https://github.com/derpito8909/tierraBendicion.git
```

2. para ejecutar el API ingrese a la carpeta Backend, y instale las dependencias:

```shell
 cd backend
 npm install
```

3. inicie el servidor del API con la opcion npn run start

```shell
npm run start
```

4. para ejecutar la pagina principal inngrese a la carpeta /frontend/tierraBendicion y instale las depencias

```shell
cd frontend/tierraBendicion && npm install
```

5. ejecute el comando build para construir el proyecto

```shell
ng build
```

6. ejecute el comando ng serve para arancar el proyecto el cual estara el la direccion `http://localhost:4200/inicio`

```shell
ng serve
```

## Autor

Proyecto <p>Sitio desarrollador por David Esteban Rodriguez Pineda 2024&copy;</p>
