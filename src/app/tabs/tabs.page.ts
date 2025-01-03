import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private storage: StorageService, private autenticacion: AuthService) {}

  logout(): void {
    this.autenticacion.logout().subscribe({
      next: res => {
        this.storage.limpiar();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
