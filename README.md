# FrontAlianzaFO

Aplicación desarrollada por Fabián Ojeda como parte de la prueba técnica para el cargo de Desarrollador Fullstack en GML Software.

La aplicación FrontAlianzaFO permite leer, crear y buscar clientes mediante un formulario y una tabla responsiva, cumpliendo con los estilos y requerimientos de la prueba técnica. Se conecta al backend desarrollado también como parte de la misma prueba, utilizando servicios REST.

También se ha implementado el punto extra de generar un archivo CSV dando click en el boton de exportar, el punto de busquqeda avanzada no se desarrolllo por falta de contextualización sobre el mismo 

Además, la aplicación permite su ejecución local y su consumo desde dispositivos móviles conectados a la misma red Wi-Fi, gracias a la correcta configuración de la URL base.

## Tecnologías y versiones utilizadas

- Angular CLI: 17.0.0
- Node.js: 18.13.0
- Angular Material (definido en el package.json)

## Instrucciones para ejecutar el proyecto

En un entorno compatible con las versiones de desarrollo:


1. Instalar dependencias:

npm install

2. Ejecutar la aplicación:

ng serve --host 0.0.0.0 --port 4200

Acceso desde:
- Navegador del mismo PC: http://localhost:4200
- Navegador de un dispositivo móvil conectado a la misma red: http://[IP_local_del_PC]:4200

## Backend

El backend también fue desarrollado por Fabián Ojeda y expone los servicios REST necesarios para el funcionamiento de la aplicación.

La URL de consumo ya está configurada para que funcione automáticamente con:
- `localhost` si se accede desde el mismo equipo
- La IP local del PC si se accede desde un móvil conectado a la red

## Contacto

Fabián Ojeda  
Email: fabian1997ojeda@gmail.com
