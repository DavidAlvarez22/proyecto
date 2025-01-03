/*export interface Pelicula {
    titulo: string;
    fechaEstreno: number;
    reparto: string[];
    generos: string[];
    href: string;
    resumen: string;
    imagen: string;
    anchoImagen: number;
    altoImagen: number;
    enCartel : string;
}
*/
export interface Pelicula {
  id : number;
  titulo: string;
  fechaEstreno: number;
  generos: string;
  reparto: string;
  resumen: string;
  valoracion:string;
  imagen: string;
  anchoImagen: number;
  altoImagen: number;
  enCartel : string;
  listas: Lista[];
}

/*
  export interface Pelis {
    title: string;
    year: number;
    cast: string[];
    genres: string[];
    href: string;
    extract: string;
    thumbnail: string;
    thumbnail_width: number;
    thumbnail_height: number;
  }
    */

  export interface Cine{
    id: number;
    latitud: string;
    longitud: string;
  }

  export interface Cartelera{
    id : number;
    cineId: number;
    peliculaId: number;
    horario: string;
    fecha: Date;
  }

  export interface Lista{
    id: number;
    nombre: string;
    usuario: Usuario;
    peliculas: Pelicula[];
  }

  export interface Usuario{
    id : number;
    email: string;
    password: string;
    nombre: string;
    listas: Lista[];
  }

  export interface Votos{
    id : number;
    peliculaId: number;
    usuarioId : number;
    puntuacion : number;
  }

  export interface PeliculaLista{
    listaId : number;
    peliculaId: number;
  }