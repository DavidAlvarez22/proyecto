import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http: HttpClient) { }

  //peticiones al controlador Cine
  getCinesAll(): Observable<any> {
    return this.http.get(API_URL + 'cine', {responseType: 'text'});
  }
  getCineById(id: number): Observable<any> {
    return this.http.get(API_URL + 'cine/id/' + id, {responseType: 'text'});
  }

  //peticiones al controlador Lista
  getListasAll(): Observable<any> {
    return this.http.get(API_URL + 'lista', {responseType: 'text'});
  }
  getListaById(id: number): Observable<any> {
    return this.http.get(API_URL + 'lista/id/' + id, {responseType: 'text'});
  }
  crearLista(datos: any): Observable<any> {
    return this.http.post(API_URL + 'lista/crea', datos);
  }
  borrarLista(id: number): Observable<any> {
    return this.http.delete(API_URL + 'lista/borra/' + id);
  }
  actualizarLista(id: number, datos: any): Observable<any> {
    return this.http.put(API_URL + 'lista/actualiza/' + id, datos);
  }

  //peticiones al controlador Pelicula
  getPeliculasAll(): Observable<any> {
    return this.http.get(API_URL + 'peliculas', {responseType: 'text'});
  }
  getPeliculasById(id: number): Observable<any> {
    return this.http.get(API_URL + 'peliculas/id/' + id, {responseType: 'text'});
  }
  getPeliculasByGeneroRepartoFechaNombre(genero?: string, reparto?: string, fechaEstreno?: number, titulo?: string): Observable<any> {
    let parametros = new HttpParams;
    if (genero) {
      parametros = parametros.set('genero', genero);
    }
    if (reparto) {
      parametros = parametros.set('reparto', reparto);
    }
    if (fechaEstreno) {
      parametros = parametros.set('fechaEstreno', fechaEstreno);
    }
    if (titulo) {
      parametros = parametros.set('titulo', titulo);
    }
    return this.http.get(API_URL + 'peliculas/buscar/genero_reparto_fecha_titulo', {params: parametros, responseType: 'text'});
  }
  getGeneros(): Observable<any> {
    return this.http.get(API_URL + 'peliculas/generos', {responseType: 'text'});
  }
  crearPeliculas(datos: any): Observable<any> {
  return this.http.post(API_URL + 'peliculas/crea', datos);
  }
  borrarPeliculas(id: number): Observable<any> {
    return this.http.delete(API_URL + 'peliculas/borra/' + id);
  }
  actualizarPeliculas(id: number, datos: any): Observable<any> {
    return this.http.put(API_URL + 'peliculas/actualiza/' + id, datos);
  }

  //peticiones al controlador PeliculaLista
  getPeliculaListaAll(): Observable<any> {
    return this.http.get(API_URL + 'pelicula_lista', {responseType: 'text'});
  }
  getPeliculaListaById(idLista: number, idPelicula: number): Observable<any> {
    return this.http.get(API_URL + 'pelicula_lista/id/' + idLista + '/' + idPelicula, {responseType: 'text'});
  }
  crearPeliculaLista(datos: any): Observable<any> {
    return this.http.post(API_URL + 'pelicula_lista/crea', datos);
  }
  borrarPeliculaLista(id: number): Observable<any> {
    return this.http.delete(API_URL + 'pelicula_lista/borra/' + id);
  }
  actualizarPeliculaLista(id: number, datos: any): Observable<any> {
    return this.http.put(API_URL + 'pelicula_lista/actualiza/' + id, datos);
  }

  //peticiones al controlador Usuario
  getUsuarioAll(): Observable<any> {
    return this.http.get(API_URL + 'usuario', {responseType: 'text'});
  }
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(API_URL + 'usuario/id/' + id, {responseType: 'text'});
  }
  crearUsuario(datos: any): Observable<any> {
    return this.http.post(API_URL + 'usuario/crea', datos);
  }
  borrarUsuario(id: number): Observable<any> {
    return this.http.delete(API_URL + 'usuario/borra/' + id);
  }
  actualizarUsuario(id: number, datos: any): Observable<any> {
    return this.http.put(API_URL + 'usuario/actualiza/' + id, datos);
  }

  //peticiones al controlador Votos
  getVotosAll(): Observable<any> {
    return this.http.get(API_URL + 'votos', {responseType: 'text'});
  }
  getVotosById(id: number): Observable<any> {
    return this.http.get(API_URL + 'votos/id/' + id, {responseType: 'text'});
  }
  crearVotos(datos: any): Observable<any> {
    return this.http.post(API_URL + 'votos/crea', datos);
  }
  borrarVotos(id: number): Observable<any> {
    return this.http.delete(API_URL + 'votos/borra/' + id);
  }
  actualizarVotos(id: number, datos: any): Observable<any> {
    return this.http.put(API_URL + 'votos/actualiza/' + id, datos);
  }
}
