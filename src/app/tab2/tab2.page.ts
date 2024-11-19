import { Component, Input, OnInit } from '@angular/core';
import { ClasificacionService } from '../Servicios/clasificacion.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { NuevaClasificacionPage } from '../nueva-clasificacion/nueva-clasificacion.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  clasificaciones: string[] = [];
  peliculas: any[] = [];
  segmentoSeleccionado: string = '';
 
  

  constructor(private clasificacionService: ClasificacionService, private modal:ModalController, private alertController: AlertController) {}

  ngOnInit() {
    this.actualizarClasificaciones();
  }

  actualizarClasificaciones() {
    this.clasificaciones = this.clasificacionService.obtenerClasificaciones();
    this.filtrarPeliculasPorClasificacion();
  }
  
  clasificarPelicula(pelicula: any, clasificacion: string) {
          
      // Clasificamos la película usando el servicio
      this.clasificacionService.clasificar(pelicula, clasificacion);
    
      // Recargamos las películas de la clasificación seleccionada
      this.obtenerPeliculasClasificadas();
    }

  filtrarPeliculasPorClasificacion() {
    if (this.segmentoSeleccionado) {
      this.peliculas = this.clasificacionService.obtenerClasificadas(this.segmentoSeleccionado);
    } else {
      this.peliculas = []; // Si no hay clasificación seleccionada, limpiamos la lista
    }
  }

   // Método para eliminar una película por índice
   eliminarPelicula(index: number) {
  // Verifica que el índice esté dentro de los límites del arreglo de películas
  if (index >= 0 && index < this.peliculas.length) {
    // Elimina solo la película en el índice proporcionado
    this.peliculas = this.peliculas.filter((_, i) => i !== index);
    this.clasificacionService.eliminarPeliculaDeClasificacion(this.segmentoSeleccionado, index);
  }
}
 /*
 METODO PARA ABRIR EL MODA QUE YA TENEMOS. SE PUEDE ADAPTAR POR SI QUEREMOS OTRO
  async abrirModal(pelicula: any) {
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps: { pelicula }
    });
    await modal.present();
  }
*/
  async abrirAgregarClasificacionModal() {
    const modal = await this.modal.create({
      component: NuevaClasificacionPage,
      cssClass: 'custom-modal' 
    });
    modal.onDidDismiss().then(() => {
      this.clasificaciones = this.clasificacionService.obtenerClasificaciones();
    });
    await modal.present();
  }

  cambioSegmento(event: any) {
    this.segmentoSeleccionado = event.detail.value;
    this.obtenerPeliculasClasificadas();
  }

  obtenerPeliculasClasificadas() {
    console.log(`Obteniendo películas clasificadas en ${this.segmentoSeleccionado}`);
    this.peliculas = this.clasificacionService.obtenerClasificadas(this.segmentoSeleccionado);
  }

  async abrirEliminarClasificacionModal() {
    const alert = await this.alertController.create({
      header: 'Eliminar clasificación',
      cssClass: 'custom-alert',
      inputs: this.clasificaciones.map(clasificacion => ({
        type: 'radio',
        label: clasificacion,
        value: clasificacion
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: (clasificacion: string) => {
            if (clasificacion) {
              this.eliminarClasificacion(clasificacion);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarClasificacion(clasificacion: string) {
    this.clasificacionService.eliminarClasificacion(clasificacion);
    this.actualizarClasificaciones();
  }

 
}


