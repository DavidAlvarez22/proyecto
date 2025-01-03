import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CargarPelisService } from '../services/cargar-pelis.service';
import { ClasificacionService } from '../services/clasificacion.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {
  @Input() pelicula: any; 
  ListasClasificacion: any[] = []; 
  valoracionMedia: number = 0; 
  numeroValoraciones: number = 0; 
  stars: string[] = []; // Array que representa visualmente las estrellas de valoración
  verGeneros: boolean = false; // Controla si se muestran todos los géneros de la película

  constructor(private alertController: AlertController,private modalController: ModalController, private clasificacion: ClasificacionService, private router: Router, private carga: CargarPelisService) {}

  ngOnInit() {
    this.actualizarClasificaciones();
    this.obtenerValoracion();
  }

  /**
   * Método que actualiza la lista de clasificaciones desde el servicio
   *
   */
  actualizarClasificaciones() {
    this.ListasClasificacion = this.clasificacion.obtenerClasificaciones();
  }

 /**
   * Método que clasifica la película en la categoría seleccionada y cierra el modal
   *
   */
  clasificarPelicula(clasificacion: string) {
    this.clasificacion.clasificar(this.pelicula, clasificacion);
    this.modalController.dismiss();
  }

  /**
   * Método que cierra el modal sin realizar ninguna acción adicional
   *
   */
  cerrar() {
    this.modalController.dismiss();
  }

  /**
   * Método que alterna entre mostrar todos los géneros de la película o solo los primeros
   *
   */
  toggleGeneros() {
    this.verGeneros = !this.verGeneros;
  }

  /**
   * Método que abre la página de geolocalización, configurando primero el título de la película seleccionada
   *
   */
  abrirGeolocalizacion(titulo: string) {
    this.carga.setTituloPeliculaSeleccionada(this.pelicula.titulo);
    this.router.navigate(['/mi-app/cines-cercanos']);
    this.modalController.dismiss();
  }

   /**
   * Método que obtiene la valoración promedio y el número total de valoraciones desde el servicio
   *
   */ 
  obtenerValoracion() {
    const valoracion = this.clasificacion.obtenerValoracion(this.pelicula.id);
    if (valoracion) {
      // Redondea la valoración media a dos decimales y actualiza la visualización de estrellas
      this.valoracionMedia = parseFloat(valoracion.media.toFixed(2));
      this.numeroValoraciones = valoracion.total;
      this.actualizarEstrellas();
    }
  }

  /**
   * Método que genera un array de estrellas (llenas y vacías) basado en la valoración media
   *
   */ 
  actualizarEstrellas() {
    const estrellasLlenas = Math.round(this.valoracionMedia);
    this.stars = []; // Limpia el array actual de estrellas

    // Bucle que llena el array con estrellas llenas hasta alcanzar la valoración media
    for (let i = 0; i < 5; i++) {
      if (i < estrellasLlenas) {
        this.stars.push('star'); // Estrella llena
      } else {
        this.stars.push('star-outline'); // Estrella vacía
      }
    }
  }

   /**
   * Método que genera unalertcontroller para que el usuario introduzca una valoración
   *
   */ 
  async valorarPelicula() {
    const alert = await this.alertController.create({
      header: 'Introduce tu valoración', 
      message: 'Por favor, introduce un número entre 0 y 5.', 
      inputs: [
        {
          name: 'valoracion', 
          type: 'number', 
          min: 0, // Valor mínimo permitido
          max: 5, // Valor máximo permitido
          placeholder: 'Valoración', 
        },
      ],
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel',
          handler: () => {
            console.log('Valoración cancelada');
          },
        },
        {
          text: 'Aceptar', 
          handler: (data) => {
            const valor = parseFloat(data.valoracion); // Convierte la entrada a un número float

            // Condición que valida que la valoración esté entre 0 y 5
            if (!isNaN(valor) && valor >= 0 && valor <= 5) {
              this.clasificacion.guardarValoracion(this.pelicula.id, valor); // Guarda la valoración en el servicio
              this.obtenerValoracion(); // Actualiza la valoración y la visualización de estrellas
            } else {
              this.mostrarErrorValoracion(); // Muestra un mensaje de error si la valoración no es válida
            }
          },
        },
      ],
    });

    await alert.present(); 
  }

   /**
   * Método que muestra un mensaje de error cuando la valoración introducida no es válida
   *
   */ 
  async mostrarErrorValoracion() {
    const errorAlert = await this.alertController.create({
      header: 'Error', 
      message: 'Por favor, introduce un número válido entre 0 y 5.', 
      buttons: ['OK'], 
    });

    await errorAlert.present(); 
  }
}
