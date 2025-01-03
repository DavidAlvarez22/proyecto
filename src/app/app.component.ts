import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  esLogueado = false;

  constructor(private storage: StorageService, private auth: AuthService) {}

  nngOnInit(): void {
    this.esLogueado = this.storage.esLogueado();

    if(this.esLogueado) {

    }
  }
}
