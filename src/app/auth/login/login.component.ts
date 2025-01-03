import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  formulario: any = {
    email: null,
    password: null
  }
  sesionIniciada = false;
  loginFallido = false;
  mensajeError = '';
  nombre: string = '';

  constructor(private autenticacion: AuthService, private storage: StorageService) { }

  ngOnInit(): void {
    if (this.storage.esLogueado()) {
      this.sesionIniciada = true;
      this.nombre = this.storage.getUsuario().nombre;
    }
  }

  onSubmit(): void {
    const {email, password} = this.formulario;

    this.autenticacion.login(email,password).subscribe({
      next: data => {
        this.storage.setUsuario(data);
        this.loginFallido = false;
        this.sesionIniciada = true;
        this.nombre = this.storage.getUsuario().nombre;
        window.location.reload();
      },
      error: err => {
        this.mensajeError = err.error.message;
        this.loginFallido = true;
      }
    });
  }

}
