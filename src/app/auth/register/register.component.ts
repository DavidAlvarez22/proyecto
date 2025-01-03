import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  formulario: any = {
    email: null,
    password: null,
    nombre: null
  };

  exitoso = false;
  registroFallido = false;
  mensajeError = '';

  constructor(private autenticacion: AuthService) { }

  onSubmit(): void {
    const {email, password, nombre} = this.formulario;

    this.autenticacion.register(email, password, nombre).subscribe({
      next: data => {
        this.exitoso = true;
        this.registroFallido = false;
      },
      error: err => {
        this.mensajeError = err.console.error.message;
        this.registroFallido = true;
      }
    });
  }

}
