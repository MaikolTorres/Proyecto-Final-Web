import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login-service.service';
import { LoginRequest } from './loginRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required], 
    usu_contrasena: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
          // Muestra una notificación de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: 'Bienvenido de nuevo',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        },
        error: (errorData) => {
          console.error(errorData);
          // Muestra una notificación de error con SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Error al ingresar los datos.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      // Muestra una notificación de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Por favor, ingrese los datos correctamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  }
  
}