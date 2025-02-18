import { HttpClient, HttpParams } from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {Observable, map} from 'rxjs';
import {Point} from "ol/geom";
import {Coordinate} from "ol/coordinate";
import {transform} from "ol/proj";
import {RouteData} from "../mis-interfaces/ruta";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private http= inject(HttpClient);
  private ubicacion =signal<Coordinate|undefined>(undefined);

  public updateLocalizacion(loc:Coordinate|undefined){
    this.ubicacion.set(loc);
  }


  /**
   *
   * @param posicion
   * @param cine
   */
  ruta(posicion:Coordinate, cine:Coordinate):Observable<string>{
    posicion =transform(posicion, 'EPSG:3857', 'EPSG:4326');
    return  this.http
      .post<RouteData>(
       environment.url + environment.ruta_localizacion,{
         cine:cine.join(','),
          posicion:posicion.join(',')
       }
      )
      .pipe(
        map(data => data.routes[0].geometry)
      );
  }
}
