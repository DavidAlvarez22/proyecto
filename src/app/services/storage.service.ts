import { Injectable } from '@angular/core';

const CLAVE_USUARIO =  'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  limpiar(): void{
    window.sessionStorage.clear();
  }

  public setUsuario(usuario: any): void {
    window.sessionStorage.removeItem(CLAVE_USUARIO);
    window.sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
  }

  public getUsuario(): any {
    const usuario = window.sessionStorage.getItem(CLAVE_USUARIO);
    if(usuario) {
      return JSON.parse(usuario);
    }

    return {};
  }

  public esLogueado(): boolean {
    const usuario = window.sessionStorage.getItem(CLAVE_USUARIO);
    if (usuario) {
      return true;
    }

    return false;
  }
}
