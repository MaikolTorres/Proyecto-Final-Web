import { Carrera } from '../carrera/carrera';
import { Jornada } from '../jornada/jornada';
import { Curso } from '../listar-curso/curso';
import { Periodos } from '../periodos/periodo';
import { Asignatura } from '../asignatura/asignatura';
import { ActividadesDocente } from '../actividades-docente/actividades-docente';
import { ActividadesNoDocente } from '../actividades-no-docente/actividades-no-docente';
import { Docente } from '../docente/docente';

export class Distributivo {
  distributivo_id: number = 0;
  calculoHorasTotal: number = 0;
  'modeloCarrera': Carrera;
  'modeloCurso': Curso;
  'modeloPeriodos': Periodos;
  'modeloJordana': Jornada;
  'modeloAsignaturas': Asignatura;
  'modeloActividadesDocentes': ActividadesDocente;
  'modeloActividadesNoDocentes': ActividadesNoDocente;
  'modeloDocente': Docente;
}

