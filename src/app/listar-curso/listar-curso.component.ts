import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CursoService } from './curso.service';
import { FormsModule } from '@angular/forms';
import { ActualizarCursoModalComponent } from './actualizar-curso-modal/actualizar-curso-modal.component';
import { JornadaComponent } from '../jornada/jornada.component';
import { ListarCarreraComponent } from '../carrera/listar-carrera.component';
import { ListarPeriodoComponent } from '../periodos/listar-periodo.component';


@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent {
}
