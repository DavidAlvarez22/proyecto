import {inject, Injectable, signal} from '@angular/core';
import {ApiService} from "./api.service";
import {Lista} from "../mis-interfaces/lista";
import {toObservable} from "@angular/core/rxjs-interop";
import {Pelicula, PeliculaLista} from "../mis-interfaces/pelicula";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private api = inject(ApiService);

  private listas = signal<Lista[]>([]);
  listas$ = toObservable(this.listas);
  constructor() { }

  /**
   *Carga todas las listas relacionadas con un usuario
   */
  public loadListas(){
    this.api.get(environment.ruta_lista)
      .subscribe({
        next:(response:Lista[]) => this.listas.set(response),
        error:((e)=>console.log("ERROR"))
      });
  }

  /**
   *
   * @param lista
   */
  public addLista(lista: Lista){
    this.api.post(environment.ruta_pelicula_lista, lista).subscribe({
      next:(response:Lista[]) => {
        this.listas.set([]);
        this.listas.set(response);
      },
      error:((e)=>console.log("ERROR"))
    });
  }

  /**
   *
   * @param listaId
   */
  public deleteLista(listaId: number){
    const url = environment.ruta_lista + '/'
      + listaId;
    this.api.delete(url).subscribe({
      next:(response:Lista[]) => {
        this.listas.set([]);
        this.listas.set(response);
      },
      error:((e)=>console.log("ERROR"))
    });
  }

  /**
   * Añade una pelicula de una lista a otra
   * @param pl
   */
  /*public addPeliculoToLista(pl: PeliculaLista){
    this.api.post(environment.ruta_pelicula_lista, pl).subscribe({
      next:(response:Lista[]) => {
        this.listas.set([]);
        this.listas.set(response);
      },
      error:((e)=>console.log("ERROR"))
    });
  }
*/

  public addPeliculoToLista(pl: PeliculaLista){
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Token encontrado:', token);  // Aquí puedes ver el token
      console.log('URL de la petición:', environment.ruta_pelicula_lista);
      console.log('Cuerpo de la solicitud:', pl);  // Verifica qué estás enviando como body
    }else{
      console.log("No hay token")
    }
    this.api.post(environment.ruta_pelicula_lista, pl).subscribe({
      next: (response: Lista[]) => {
        this.listas.set([]);
        this.listas.set(response);
      },
      error: (e) => {
        console.error('ERROR', e);
        console.log(e.error.message || 'Unknown error');
      }
    });
  }
  /**
   *
   * @param pl
   */
  public deletePeliculaFromLista(pl:PeliculaLista){
    const url = environment.ruta_pelicula_lista + '/'
      + pl.listaId + '/' + pl.peliculaId;
    this.api.delete(url).subscribe({
      next:(response:Lista[]) => {
        this.listas.set([]);
        this.listas.set(response);
      },
      error:((e)=>console.log("ERROR"))
    });
  }

  /**
   * Devuelve los id de las listas donde está la pelicula
   * @param id
   */
  public getPeliculaLista(id: number):number[]{
    const numeros: number[] = [];
     this.listas().filter(lista =>{
       if(lista.peliculas.find(pelicula => pelicula.id === id))
         numeros.push(lista.id);
     }
    );
    return numeros;
  }
}
