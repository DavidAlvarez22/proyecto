import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private storage: StorageService, private autenticacion: AuthService, private router: Router) {}

  logout(): void {
    this.autenticacion.logout().subscribe({
      next: res => {
        this.storage.limpiar();
        this.router.navigate(["/login"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
