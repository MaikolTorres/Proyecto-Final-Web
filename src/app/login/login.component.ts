import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.router.navigate(['/sistema_administrativo']);
  }

  redirectToSistemaAdministrativo() {
   
    this.router.navigate(['/sistema_administrativo']);

  }
}