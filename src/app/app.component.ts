import { Component } from '@angular/core';
import { JornadaService } from './jornada/jornada.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-final';
  constructor(private jornadaService: JornadaService) { }
  actualizarTabla() {
   this.jornadaService.getJornadas();
  }
}
