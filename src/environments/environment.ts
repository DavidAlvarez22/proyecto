// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:8000',
  //url: 'http://10.2.56.127:8000/',
  ruta_peliculas: '/api/peliculas',
  ruta_lista: '/api/lista',
  ruta_pelicula_lista: '/api/pelicula_lista',
  ruta_valoracion: '/api/votos',
  ruta_cine: '/api/cartelera',
  ruta_generos: '/api/peliculas/generos',
  ruta_buscar: '/api/peliculas/buscar/genero_reparto_fecha_titulo',
  ruta_login: '/api/auth/login',
  ruta_register: '/api/auth/register',
  ruta_logout: '/api/auth/logout',
  ruta_localizacion:'/api/cine/ubicacion',
  peliculas_cartelera: '/api/cartelera/pelisCartel',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
