import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Inyecta el servicio Router en el constructor
  constructor(private router: Router) { }

  ngOnInit() {
    // Redirige a la página sistema-administrativo al iniciar el componente
    this.router.navigate(['/sistema_administrativo']);
  }

  redirectToSistemaAdministrativo() {
    // Redirige a la ruta '/sistema-administrativo'
    console.log("Redirigiendo a sistema-administrativo");
    this.router.navigate(['/sistema-administrativo']);
  
  }
}