import {Component, DestroyRef, inject, Input, OnInit, signal} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { NuevaClasificacionPage } from '../nueva-clasificacion/nueva-clasificacion.page';
import {ListaService} from "../servicios/lista.service";
import {Lista} from "../mis-interfaces/lista";
import {Pelicula} from "../mis-interfaces/pelicula";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private listaSer = inject(ListaService);
  private destroy = inject(DestroyRef);

  listas = signal<Lista[]>([]);
  selectedlista = signal<Lista|undefined>(undefined);


  constructor(
    private modal: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.listaSer.loadListas();
    const subs = this.listaSer.listas$.subscribe({
      next:(response) => this.listas.set(response)
    });
    //Destruye la subscripcion
    this.destroy.onDestroy(() =>subs.unsubscribe);
  }

  public onShowMore(id:string){
    const element = document.getElementById(id);

    //if(element != null)
    let resultado = id.replace("lista", ""); //Sacamos el id de la lista
    const intId: number = Number(resultado); //Pasamos a number el string con el id
    console.log("ID: " + intId);
    const listaPrueba: Lista = this.listas().find(lista => lista.id === intId)!;    this.onChangeLista(listaPrueba);
    //console.log(this.selectedlista());
    const visible = element!.getAttribute('visible')!;
    if(visible === 'true'){
      element!.setAttribute('visible', 'false');
      element!.style.display = 'none';
    }
    else if(visible === 'false'){
      element!.setAttribute('visible', 'true');
      element!.style.display = 'flex';
    }

    console.log(element!.attributes);
  }

  /**
   * Muestra las peliculas de la lista seleccionada
   * @param listaId
   */
  public onChangeLista(lista: Lista){
    this.selectedlista.set(lista);
    console.log("lista Change:");
    console.log(lista);
    //this.peliculas.set([]);
    //this.peliculas.set(lista.peliculas);
  }

  /**
   * Dado el id de una pelicula la elimina de la lista
   * @param listaId
   */
  deletePeliculaFromLista(peliculaId: number) {
    console.log("Lista seleccionada:" + peliculaId);
    console.log(this.selectedlista());
    this.listaSer.deletePeliculaFromLista({
      listaId: this.selectedlista()!.id,
      peliculaId: peliculaId
    });
  }

  /*
  * Busca la lista donde no esta incluida la pelicula
  * @param peliculaId
  * @returns boolean
  */
  getListasByPelicula(peliculaId:number){
    //Busca las listas donde no este incluida la pelicula
    return  this.listas().filter(lista =>{
      const find = lista.peliculas.find(
        pelicula => pelicula.id === peliculaId);
      return find ? false : true;
    });
  }

  /**
   * Método que clasifica la película en la categoría seleccionada y cierra el modal
   *
   */
  addALista(listaId: number, peliculaId: number) {
    this.listaSer.addPeliculoToLista({
      listaId: listaId,
      peliculaId: peliculaId
    });
    //this.clasificacion.clasificar(this.pelicula, clasificacion);
    //this.modalController.dismiss();
  }

  /**
   * Método que abre un alertController para agregar una nueva clasificación.
   */
  async openAgregarLista() {
    const alert = await this.alertController.create({
      header: 'Agregar Lista',
      cssClass: 'custom-alert',
      inputs: [
        {
          name: 'nuevaClasificacion',
          type: 'text',
          placeholder: 'Escribe una clasificación...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const nombreLista = data.nuevaClasificacion?.trim();
            if (  nombreLista ) {
              // Agregar la nueva clasificación al servicio
              //this.clasificacionService.agregarClasificacion(nuevaClasificacion);
              this.agregarLista(nombreLista);
              //this.actualizarClasificaciones(); // Actualizar la lista
              return true;
            } else
              return false; // No guardar si el texto está vacío
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   *  Método que abre un alertController para eliminar una clasificación existente.
   */
  async openEliminarLista() {
    const alert = await this.alertController.create({
      header: 'Eliminar clasificación',
      cssClass: 'custom-alert',
      inputs: this.listas().map(lista => ({
        type: 'radio',
        label: lista.nombre,
        value: lista.id
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: (listaId: number) => {
            if (listaId) {
              // Llama al método para eliminar la lista
              this.eliminarLista(listaId);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Dado el id de una lista elimina la lista
   * @param listaId
   */
  eliminarLista(listaId: number) {
    this.listaSer.deleteLista(listaId);
    //this.clasificacionService.eliminarClasificacion(clasificacion);
    //this.actualizarClasificaciones();
  }

  /**
   * Dado el nombre de la lista crea una nueva lista con dicho nombre
   * @param nombre
   */
  agregarLista(nombre: string){
    this.listaSer.addLista(nombre);
  }
}
