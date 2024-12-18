import { Component, OnInit } from '@angular/core';
import { CargarPelisService } from '../Servicios/cargar-pelis.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Todas las películas obtenidas del JSON/API
  peliculas: any[] = [];
  // Películas tras aplicar filtros
  peliculasFiltradas: any[] = [];
  // Películas correspondientes a la página actual
  peliculasPaginadas: any[] = [];

  // Variables para filtrar las películas
  buscarTexto: string = ''; // Texto de búsqueda para filtrar por título
  generoSeleccionado: string = ''; // Género seleccionado
  FechaLanzamiento: number | null = null; // Año de lanzamiento

  // Variables para la paginación
  paginaActual: number = 1; // Página actual
  tamanoPagina: number = 25; // Cantidad de películas por página
  totalPaginas: number = 0; // Total de páginas calculadas

  isLoading: boolean = true; // Flag para el spin de carga
  generos: string[] = []; // Lista de géneros disponibles

  constructor(private cargar: CargarPelisService, private modal: ModalController) {}//Injectamos el servicio y modal controler para el modal

  /**
   * El método ngOnInit carga las películas y prepara la lista de géneros.
   */
  ngOnInit() {
    this.isLoading = true;// Activa la barra de carga
    this.cargar.getPeliculas().pipe(delay(1000)).subscribe(data => {//delay para retrasar artificialmente
      this.peliculas = data;
      this.aplicarFiltros(); // Aplicar filtros iniciales
      this.actualizarGeneros(); // Crear la lista de géneros
      this.isLoading = false; // Finalizar la carga
    }, error => {
      console.error("Error cargando películas", error);
      this.isLoading = false;
    });
  }

  /**
   * Método que aplica los filtros de búsqueda, género y año de lanzamiento sobre las películas,
   * y actualiza la paginación.
   */
  aplicarFiltros() {
    let resultado = [...this.peliculas]; // Copiar la lista de películas

    // Filtro por título
    if (this.buscarTexto.trim()) {
      resultado = resultado.filter(peli =>
        peli.titulo.toLowerCase().includes(this.buscarTexto.toLowerCase())
      );
    }

    // Filtro por género
    if (this.generoSeleccionado) {
      resultado = resultado.filter(peli =>
        peli.generos && peli.generos.includes(this.generoSeleccionado)
      );
    }

    // Filtro por año de lanzamiento
    if (this.FechaLanzamiento) {
      resultado = resultado.filter(peli =>
        peli.fechaLanzamiento == this.FechaLanzamiento
      );
    }

    // Asignar las películas filtradas
    this.peliculasFiltradas = resultado;

    // Calcular el número total de páginas
    this.paginaActual = 1; // Reiniciar a la primera página
    this.totalPaginas = Math.ceil(this.peliculasFiltradas.length / this.tamanoPagina);

    // Actualizar la paginación
    this.cargarPagina();
  }

  /**
   * Método que actualiza la lista de películas para mostrar en la página actual.
   */
  cargarPagina() {
    const inicio = (this.paginaActual - 1) * this.tamanoPagina; // Índice inicial
    const fin = inicio + this.tamanoPagina; // Índice final

    // Seleccionar las películas de la página actual
    this.peliculasPaginadas = this.peliculasFiltradas.slice(inicio, fin);
  }

  /**
   * Método que sirve para cambiar a la página siguiente, si existe.
   */
  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.cargarPagina();
    }
  }

  /**
   * Método que sirve para cambiar a la página anterior, si existe.
   */
  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.cargarPagina();
    }
  }

  /**
   *Método que genera una lista única y ordenada de géneros a partir de las películas cargadas.
   */
  actualizarGeneros() {
    const generosSet = new Set<string>(); // Set para eliminar duplicados
    this.peliculas.forEach(peli => {
      if (peli.generos) {
        peli.generos.forEach((genero: string) => generosSet.add(genero));
      }
    });
    // Convertir el Set a un array y ordenarlo
    this.generos = Array.from(generosSet).sort();
  }

  /**
   * Método que abre un modal con detalles de una película específica.
   * @param pelicula Objeto que contiene la información de la película.
   */
  async abrirModal(pelicula: any) {
    const modal = await this.modal.create({
      component: ModalPage, 
      componentProps: { pelicula }, 
    });
    await modal.present(); 
  }
}
