import { Component, OnInit } from '@angular/core';
import { CargarPelisService } from '../servicios/cargar-pelis.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

import { delay } from 'rxjs/operators'; //Delay artificial para ver si funciona la barra de cargar


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Arrays donde guardamos las peliculas iniciales y las obtenidas por filtros
  peliculas: any[] = [];
  peliculasFiltradas: any[] = [];

  // Variables para filtros
  buscarTexto: string = '';
  generoSeleccionado: string = '';
  FechaLanzamiento: number | null = null;

  isLoading: boolean = true// Bandera para la barra de carga

  // Array de géneros que se usará en el select
  generos: string[] = [];

  constructor(private cargar: CargarPelisService, private modal: ModalController) {} //Injectamos el servicio y modal controler para el modal

  ngOnInit() {
    this.isLoading = true; // Activa la barra de carga

    // Cargar todas las películas al inicio
    this.cargar.getPeliculas().pipe(delay(5000)).subscribe((data) => {//delay para retrasar artificialmente
      this.peliculas = data;
      this.peliculasFiltradas = data; // Inicia con todas las pelis
      this.actualizarGeneros();
      this.isLoading = false;//Desactiva la barra de carga
      }, error => {
      console.error("Error cargando películas", error);
      this.isLoading = false;
    });
  }

   /**
   * Actualiza la lista de géneros disponibles de manera dinámica en función de las peliculas cargadas.
   * Elimina duplicados y ordena los géneros alfabéticamente.
   */
actualizarGeneros() {
  const cadaGenero= new Set<string>();

  // Recorrer las películas y recopilar géneros
  this.peliculas.forEach(pelicula => {
    if (pelicula.generos && Array.isArray(pelicula.generos)) {
      pelicula.generos.forEach((genero: string) => cadaGenero.add(genero));
    }
  });

  // Convertir el conjunto a un array y asignarlo a la variable 'generos'
  this.generos = Array.from(cadaGenero).sort();
}

   /**
   * Método para filtrar la lista de películas mostradas.
   * Filtra por título, género y año de lanzamiento según los valores introducidos.
   */
  filtrar() {
    this.peliculasFiltradas = this.peliculas;

    // Filtrar por título
    if (this.buscarTexto) {
      this.peliculasFiltradas= this.cargar.filtrarPorTitulo(this.peliculas, this.buscarTexto);
    }

    // Filtrar por género
    if (this.generoSeleccionado) {
      this.peliculasFiltradas = this.cargar.filtrarPorGeneros(this.peliculasFiltradas, this.generoSeleccionado);
    }

    // Filtrar por año
    if (this.FechaLanzamiento) {
      this.peliculasFiltradas = this.cargar.filtrarPorFechaEstreno(this.peliculasFiltradas, this.FechaLanzamiento);
    }
  }

  /**
   * Método pra abrir un modal con los detalles de la película seleccionada.
   * @param pelicula Objeto que contiene los datos de la película a mostrar en el modal.
   */
  async abrirModal(pelicula: any) {
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps: { pelicula },
    });
    await modal.present();
  }
}
